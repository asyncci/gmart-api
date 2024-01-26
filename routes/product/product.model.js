//Load Packages
var mongoose = require("mongoose");

var ProductSchema = new mongoose.Schema(
  {
    name: String,
    photos: [],
    description: String,
    location: String,
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
