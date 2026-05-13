const axios = require("axios");
const mongoose = require("mongoose");

exports.handleChat = async (req, res) => {
    try {
        const { message } = req.body;
        const apiKey = process.env.GEMINI_API_KEY;

        // 1. تحديد الجداول اللي هنقرأ منها (كل حاجة ما عدا users)
        const collectionsToFetch = [
            'venues', 'birthdays', 'eventoptions', 'graduations', 
            'outdoors', 'planners', 'specialevents', 'weddings'
        ];

        // 2. سحب الداتا من كل الجداول دي "ديناميكياً"
        const db = mongoose.connection.db;
        const allDataResults = await Promise.all(
            collectionsToFetch.map(async (colName) => {
                const data = await db.collection(colName).find({}).toArray();
                return { [colName]: data };
            })
        );

        // تجميع كل الجداول في كائن واحد
        const combinedData = Object.assign({}, ...allDataResults);
        const contextData = JSON.stringify(combinedData);

        // --- سطر كشف المشكلة للـ Debug ---
        console.log("--- DEBUG: تم سحب الداتا من كل الجداول بنجاح ---");

        // 3. تحديد الموديل (زي كودك القديم)
        const modelsUrl = `https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`;
        const modelsResponse = await axios.get(modelsUrl);
        const availableModels = modelsResponse.data.models;
        const bestModel = availableModels.find(m => m.name.includes("flash")) || availableModels[0];
        const modelName = bestModel.name;

        // 4. الـ Prompt "العبقري" اللي بيشمل كل حاجة والمواعيد
        const prompt = `
        أنت مساعد ذكي ومصري (فيومي أصيل) لموقع Aura Planner.
        مهمتك ترد على العلاء باستخدام البيانات الحقيقية دي من قاعدة بياناتنا:
        ${contextData}

        التعليمات الإجبارية:
        1. الرد يكون بلهجة مصرية عامية ودودة جداً.
        2. لو العميل سأل عن "مواعيد حجز" أو "إيه الأيام الفاضية": بص فوراً في قسم (eventoptions). حلل التواريخ المتاحة والمحجوزة ورد عليه بدقة.
        3. لو سأل عن أي نوع مناسبة (فرح، عيد ميلاد، تخرج، أوت دور): بص في الجدول المناسب لها (weddings, birthdays, graduations, outdoors) واديله ترشيحات بالأسماء والأسعار.
        4. لو سأل عن منظمين حفلات: بص في قسم (planners).
        5. ممنوع تقول "مش عارف" لو المعلومة موجودة في البيانات فوق. لو البيانات فاضية تماماً، قوله: "يا هندسة السيرفر مش قاري داتا، خليني أتأكدلك من الإدارة".
        6. حافظ على سرية البيانات التقنية، اديه الخلاصة اللي تفيده بس.

        سؤال العميل: "${message}"
        `;

        // 5. إرسال الطلب لـ Google
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
        res.status(500).json({ error: "حصلت مشكلة، بص على الترمينال يا بطل." });
    }
};
