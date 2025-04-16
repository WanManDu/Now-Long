const mongoose = require("mongoose");

const quizMetaSchema = new mongoose.Schema({
    chartDataId: { type : mongoose.Schema.Types.ObjectId, ref: "ChartData", required: true},
    difficulty: {type: String, enum: ["easy", "medium", "hard"], default: "medium"},
    indicators: [String],
    chartTheme: {types:String, default: "light"},
    isAiValidated: {type: Boolean, default: false},
    aiCommentary: String
}, {timestamps: true});

module.exports = mongoose.model("QuizMeta", quizMetaSchema);