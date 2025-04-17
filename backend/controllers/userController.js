const User = require("../models/User");

//사용자 프로필 변환
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findOne({ uid: req.user.uid});

        if (!user) {
            return res.status(404).json({ error: "User not found"});
        }

        res.json({
            uid: user.uid,
            rating: user.rating,
            coin: user.coins,
            quizzesSolved: user.quizzesSolved,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({error: "Failed to fetch user profile"});
    }
};