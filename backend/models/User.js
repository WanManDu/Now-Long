const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    uid: { type: String, required: true, unique: true},
    level: {type: Number, default: 1},
    exp: {type: Number, default: 0},
    coins: {type: Number, default: 0},
    quizzesSolved: {type: Number, default: 0}
}, {timestamps: true});

module.exports = mongoose.model("User", userSchema);