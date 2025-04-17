const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/auth");
const { getRandomQuiz, submitQuizAnswer } = require("../controllers/quizController");

//[Get] /api/quiz/random
//인증된 사용자에게 퀴즈 제공
router.get("/random", authenticate, getRandomQuiz);

//[post] /api/quiz/submit
//사용자의 퀴즈 응답 저장
router.post("/subimt", authenticate, submitQuizAnswer);

module.exports = router;