const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const { initializeFirebase } = require("./config/firebase");

dotenv.config();
const app = express();

app.use((req, res, next) => {
    console.log(`🔥 [APP] 요청 들어옴: ${req.method} ${req.path}`);
    next();
  });

app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }));
app.use(express.json());

//DB & Firebase 연결
connectDB();
initializeFirebase();

//라우팅 연결
app.use("/api/quiz", require("./routes/quiz"));
app.use("/api/user", require("./routes/user"));
app.use("/api/feedback", require("./routes/feedback"));
app.use("/api/auth", require("./routes/auth"));

//서버 시작
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));
