const mongoose = require("mongoose");

const chartDataSchema = new mongoose.Schema({
  assetSymbolData: {type : String, required: true},
  startDate: { type : Date, required:true},
  endDate: { type : Date, required:true},
  answerImageUrl: { type: String },
  ohlcv: [
    {
        date: Date,
        open: Number,
        high: Number,
        low: Number,
        close: Number,
        volume : Number
    }
  ]
}, {timestamps : true});

module.exports = mongoose.model("ChartData", chartDataSchema);