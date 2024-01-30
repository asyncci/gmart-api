var mongoose = require("mongoose");

var RequestSchema = new mongoose.Schema(
  {
    title: String,
    requestDescription: String,
    textileDescription: String,
    price: String,
    time:String,
    paymentMethod: String,
    amount: Number,
    photos: [],
  },
  {
    timestamps: true,
  }
);

const Request = mongoose.model("Request", RequestSchema);

module.exports = Request;
