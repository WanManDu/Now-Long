//Gpt 에게 보낼 프롬프트 만드는 유틸리티
function buildPrompt({ chartData, indicators, userReasons}) {
    return `
You are a professional trading coach.

Here is the chart data (OHLCV): ${JSON.stringify(chartData)}
Indicators used: ${indicators.join(", ")}
User's prediction rationale: 
- ${userReasons.join("\n- ")}

Based on this information, please give feedback in 3 sentences.
Focus on technical accuracy and suggest improvements.
`;
}

module.exports = { buildPrompt };
