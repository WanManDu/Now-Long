const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/auth");
const {getProfile} = require("../controllers/userController");

//[Get] /api/user/profile
//인증된 사용자의 프로필 조회
router.get("/profile", authenticate, getProfile);

module.exports = router;