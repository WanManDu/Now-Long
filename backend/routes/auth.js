//routes/auth.js
const express = require("express");
const router = express.Router();
const { loginWithFirebase } = require("../controllers/authController");

router.post("/login", loginWithFirebase);

module.exports = router;