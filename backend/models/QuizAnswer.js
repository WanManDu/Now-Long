const mongoose = require("mongoose");

const quizAnswerSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    quizMetaId: {type: mongoose.Schema.Types.ObjectId, ref: "QuizMeta", required: true},
    prediction: {type: String, enum: ["long", "short"], required: true},
    reasons: [String],
    isCorrect: { type: Boolean, default: false}
}, { timestamps: true});

module.exports = mongoose.model("QuizAnswer", quizAnswerSchema);