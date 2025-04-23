const { buildPrompt } = require("../utils/gptPromptBuilder");
const axios = require("axios");

//사용자 답변 기반 GPT 피드백 생성
exports.generateFeedback = async (req, res) => {
    const { chartData, indicators, userReasons } = req.body;

    if (!chartData || !indicators || !userReasons ) {
        return res.status(400).json({error: "Missing required fields "});
    }

    const prompt = buildPrompt({ chartData, indicators, userReasons});

    try{
        const response = await axios.post(
            "https://api.opendai.com/v1/chat/completions",
            {
                model: "gpt-4",
                message: [
                    { role: "system", content:  "You are a professinal trading coach."},
                    { role: "user", content: prompt }
                ],
                max_tokens: 300,
                temperate : 0.7
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer $${process.env.OPENAI_API_KEY}`
                }
            }
        );
    } catch (err) {
        console.error(err.response?.data || err.message);
        res.status(500).json({ error: "Failed to generate feedback"});
    }
}