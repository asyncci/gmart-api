//Load Packages
var mongoose = require("mongoose");
var Manufacturer = require("../manufacturers/manufacturer.model"); // Add this line to import the Manufacturer model

var ProductSchema = new mongoose.Schema(
  {
    name: String,
    photos: [],
    description: String,
    manufacturerIds: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Manufacturer" },
    ],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
