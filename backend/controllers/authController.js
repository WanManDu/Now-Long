//controllers/authController.js
const {admin} = require("../config/firebase");
const User = require("../models/User");

exports.loginWithFirebase = async (req, res) => {
    const {idToken} = req.body;
    if (!idToken) return res.status(400).json({error: "Missing Firebase ID Token"});

    try {
        const decoded = await admin.auth().verifyIdToken(idToken);
        const { uid, email, name, picture } = decoded;

        let user = await User.findOne({ uid });

        if (!user) {
            user = await User.create({
                uid,
                email: email || "",
                displayName: name || "Anonymous",
                photoURL: picture || null,
                rating: 1000,
                coins: 0,
                quizzesSolved: 0
            });
        }

        res.json({ message: "Login Success", user});

    } catch (err) {
        console.error("Firebase Auth Error:", err);
        res.status(401).json({error: "Invalid Firebase Token"});
    }
};