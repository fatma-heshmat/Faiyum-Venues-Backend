const axios = require("axios");
const Venue = require("../models/Venue");

exports.handleChat = async (req, res) => {
    try {
        const { message } = req.body;
        const apiKey = process.env.GEMINI_API_KEY;

        // 1. سحب بيانات القاعات من المونجو
        const venues = await Venue.find();
        
        // --- سطر كشف المشكلة (بص عليه في الترمينال عندك) ---
        console.log("--- DEBUG: عدد القاعات اللي لقيناها في الداتا بيز =", venues.length);
        // --------------------------------------------------

        const contextData = JSON.stringify(venues);

        // 2. هنسأل جوجل عن الموديلات المتاحة (عشان نتفادى الـ 404)
        const modelsUrl = `https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`;
        const modelsResponse = await axios.get(modelsUrl);
        const availableModels = modelsResponse.data.models;
        const bestModel = availableModels.find(m => m.name.includes("flash")) || availableModels[0];
        const modelName = bestModel.name;

        // 3. الـ Prompt الجديد "العنيف" عشان ميبلمش
        const prompt = `
        أنت مساعد ذكي لموقع Aura Planner بالفيوم. 
        معلومات هامة جداً: البيانات التالية هي قاعات حقيقية من قاعدة بياناتنا، استخدمها للإجابة:
        ${contextData}

        التعليمات:
        - لو سألك "عندكم قاعات إيه" أو سؤال عام، لازم ترص له أسماء القاعات اللي في البيانات فوق دي وممنوع تقول "مش عارف".
        - رد بلهجة مصرية عامية (فيومي أصيل).
        - لو البيانات فوق دي فاضية، رد وقول: "يا هندسة السيستم قاري إن مفيش قاعات، اتأكد من الداتا بيز".

        سؤال العميل: "${message}"
        `;

        // 4. إرسال الطلب لـ Google
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