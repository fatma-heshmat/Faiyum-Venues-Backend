const axios = require("axios");
const mongoose = require("mongoose");

exports.handleChat = async (req, res) => {
    try {
        const { message } = req.body;
        const apiKey = process.env.GEMINI_API_KEY;

        // 1. تحديد كل الجداول المهمة (بدون اليوزرز للخصوصية)
        const collectionsToFetch = [
            'venues', 'birthdays', 'eventoptions', 'graduations', 
            'outdoors', 'planners', 'specialevents', 'weddings'
        ];

        // 2. سحب الداتا من كل الجداول مرة واحدة
        const db = mongoose.connection.db;
        const allDataResults = await Promise.all(
            collectionsToFetch.map(async (colName) => {
                const data = await db.collection(colName).find({}).toArray();
                return { [colName]: data };
            })
        );

        const combinedData = Object.assign({}, ...allDataResults);
        const contextData = JSON.stringify(combinedData);

        console.log("--- DEBUG: تم تحديث البيانات الشاملة بنجاح ---");

        // 3. تحديد أفضل موديل متاح
        const modelsUrl = `https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`;
        const modelsResponse = await axios.get(modelsUrl);
        const availableModels = modelsResponse.data.models;
        const bestModel = availableModels.find(m => m.name.includes("flash")) || availableModels[0];
        const modelName = bestModel.name;

        // 4. الـ Mega Prompt (المخ الذكي لأورا)
        const prompt = `
أنت "أورا"، المساعد الذكي الرسمي لموقع Aura Planner في الفيوم. أنت خبير وباحث في كل أماكن المناسبات (قاعات، كافيهات، نوادي، فيلات) ومنظمي الحفلات.

---
قاعدة البيانات الحقيقية المتاحة لك:
${contextData}
---

تعليمات الرد الذكي (Smart Logic):

1. **تحليل الطلب (Context Matching):**
   - لو العميل بيدور على مكان "هادي" أو "صغير" (عيد ميلاد، قعدة صحاب): ابحث في [outdoors] والكافيهات في [venues]. لا تقترح قاعات زفاف ضخمة إلا لو طلب ذلك.
   - لو المناسبة "فرح" أو "تخرج كبير": ركز على [weddings] و [venues] اللي بتشيل أعداد كبيرة.

2. **احترافية المواعيد وحالة الحجز [eventoptions]:**
   - أنت مسئول الحجز الآن. لو العميل سأل عن "يوم محدد" أو "أيام فاضية":
   - ابحث في [eventoptions] واربط بين الـ (venueId) والتاريخ (date).
   - إذا كان اليوم "booked" (محجوز): لا تقل "لا" فقط! بل اقترح مكاناً مشابهاً فاضي في نفس اليوم، أو اقترح أقرب يوم فاضي لنفس المكان.
   - إذا كان اليوم "available" (متاح): شجعه على الحجز فوراً.

3. **الشخصية (Tone of Voice):**
   - لهجة مصرية (فيومية) عامية، خفيفة الظل، وذكية (يا هندسة، يا بطل، يا عريس، يا ذوق).
   - لا تذكر أبداً أسماء تقنية (Collections, JSON, Null).
   - لو معلومة مش عندك، قول: "دي محتاجة تأكيد من صاحب المكان، تحب أوصلك بيه؟" أو "سيبلي رقمك والإدارة هتكلمك".

4. **قاعدة ذهبية:** أنت لا تخترع بيانات. التزم بالأسعار والخدمات الموجودة في الداتا المرفقة فقط.

سؤال العميل الحالي: "${message}"
        `;

        // 5. إرسال الطلب لـ Google Gemini
        const url = `https://generativelanguage.googleapis.com/v1/${modelName}:generateContent?key=${apiKey}`;

        const response = await axios.post(url, {
            contents: [{ parts: [{ text: prompt }] }]
        });

        const responseText = response.data.candidates[0].content.parts[0].text;
        res.status(200).json({ reply: responseText });

    } catch (error) {
        console.error("--- Error Details ---");
        if (error.response) {
            console.error("Google Error:", JSON.stringify(error.response.data));
        } else {
            console.error("System Error:", error.message);
        }
        res.status(500).json({ error: "حصلت مشكلة في السيرفر، جرب تاني يا بطل." });
    }
};
