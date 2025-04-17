const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/auth");
const { generateFeedback } = require("../controllers/feedbackController");

//[POST] /api/feedback
//사용자 답변 기반 GPT 피드백 제공
router.post("/", authenticate, generateFeedback);

module.exports = router;