const QuizMeta = require("../models/QuizMeta");
const QuizAnswer = require("../models/QuizAnswer");
const ChartData = require("../models/ChartData");
const User = require("../models/User");

//랜덤 퀴즈 1개 제공
exports.getRandomQuiz = async( req, res) => {
    try{
        const quiz = await QuizMeta.aggregate([{ $sample: {size : 1}}]);
        if (!quiz[0])
            return res.status(404).json({error:"no quiz found"});

        const fullQuiz = await QuizMeta.findById(quiz[0]._id).populate("chartDataId");

        const {
            _id: quizId,
            difficulty,
            indicators,
            chartTheme,
            isAiValidated,
            aiCommentary,
            chartDataId: chartData
          } = fullQuiz;
      
          res.json({
            quizId,
            difficulty,
            indicators,
            chartTheme,
            isAiValidated,
            aiCommentary,
            chartData: {
              assetSymbol: chartData.assetSymbol,
              startDate: chartData.startDate,
              endDate: chartData.endDate,
              ohlcv: chartData.ohlcv
            }
          });

    } catch (err) {
        console.error(err);
        res.status(500).json({error: "Failed to fetch quiz"});
    }
};

//사용자 예측 저장 + 경험치 증가
exports.submitQuizAnswer = async (req, res) => {
    const { quizMetaId, prediction, reasons } = req.body;

    try {
        //사용자 정보 확인
        let user = await User.findOne({ uid: req.user.uid });
        if (!user) {
            user = await User.create({ uid: req.user.uid, rating: 1000 });
        }

        //퀴즈 메타 정보 가져오기(정답 판독용)
        const quizMeta = await QuizMeta.findById(quizMetaId);
        if (!quizMeta) {
            return res.status(404).json({ error: "Quiz not found"});
        }

        //(MVP에서는 정답 여부를 수동으로 처리해야 하는데 일단은 임시로 isCorrect = true 고정)
        const isCorrect = true;

        //사용자 퀴즈 제출 저장
        const answer = await QuizAnswer.create({
            userId: user._id,
            quizMetaId,
            prediction,
            reasons,
            isCorrect: isCorrect
        });

        //레이팅 점수 조정
        user.rating += 5;
        if (isCorrect) {
            user.rating += 5;
        } else {
            user.rating -= 15;
        }

        await user.save();

        res.json({ success: true, answer });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to submit Answer"});
    }
};