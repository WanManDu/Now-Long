const mongoose = require("mongoose");
require("dotenv").config();

// 모델 임포트
const ChartData = require("./models/ChartData");
const QuizMeta = require("./models/QuizMeta");

// MongoDB 연결
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB connected for seeding"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// 시드 데이터 삽입
async function seed() {
  try {
    // 1. ChartData 생성
    const chartData = await ChartData.create({
      assetSymbolData: "AAPL",
      startDate: new Date("2024-01-01"),
      endDate: new Date("2024-01-10"),
      ohlcv: [
        { date: new Date("2024-01-01"), open: 150, high: 155, low: 148, close: 152, volume: 1000000 },
        { date: new Date("2024-01-02"), open: 152, high: 158, low: 151, close: 157, volume: 1200000 },
        { date: new Date("2024-01-03"), open: 157, high: 160, low: 155, close: 156, volume: 900000 }
        // 필요한 만큼 추가 가능
      ]
    });

    // 2. QuizMeta 생성
    await QuizMeta.create({
      chartDataId: chartData._id,
      difficulty: "medium",
      indicators: ["RSI", "MACD"],
      chartTheme: "light",
      isAiValidated: true,
      aiCommentary: "RSI is oversold, possible reversal."
    });

    console.log("✅ Seeding completed!");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  }
}

seed();
