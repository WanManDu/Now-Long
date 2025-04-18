const mongoose = require("mongoose");
const dotenv = require("dotenv");
const ChartData = require("./models/ChartData");
const QuizMeta = require("./models/QuizMeta");

dotenv.config();

// DB 연결
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
}

// 시드 데이터 삽입
async function seed() {
  try {
    // 기존 데이터 제거
    await ChartData.deleteMany({});
    await QuizMeta.deleteMany({});
    console.log("🧹 기존 데이터 삭제 완료");

    // ChartData 생성
    const chartData1 = await ChartData.create({
      assetSymbolData: "AAPL",
      startDate: new Date("2024-01-01"),
      endDate: new Date("2024-01-10"),
      ohlcv: [
        { date: new Date("2024-01-01"), open: 150, high: 155, low: 148, close: 152, volume: 100000 },
        { date: new Date("2024-01-02"), open: 152, high: 157, low: 150, close: 154, volume: 110000 },
        { date: new Date("2024-01-03"), open: 154, high: 160, low: 153, close: 158, volume: 120000 },
      ],
      answerImageUrl: "https://dummyimage.com/600x400/000/fff&text=AAPL+Result"
    });

    // QuizMeta 생성
    await QuizMeta.create({
      chartDataId: chartData1._id,
      difficulty: "medium",
      indicators: ["RSI", "MACD"],
      chartTheme: "light",
      isAiValidated: true,
      aiCommentary: "RSI is oversold, possible reversal."
    });

    console.log("🌱 시딩 완료");
    process.exit();
  } catch (err) {
    console.error("❌ 시딩 에러:", err);
    process.exit(1);
  }
}

connectDB().then(seed);
