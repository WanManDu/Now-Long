//Mongo DB 연결 설정
const mongoose = require("mongoose");

const connectDB = async ()=> {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Mongo DB connected");
    }
    catch(err){
        console.error("Mongo DB connection error:", err);
        procces.exit(1);
    }
}

module.exports = connectDB;