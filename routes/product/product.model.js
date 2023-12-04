//Load Packages
var mongoose = require("mongoose");
const Manufacturer = require("../manufacturers/manufacturer.model");
var Schema = mongoose.Schema;

var ProductSchema = new Schema(
  {
    name: String,
    description: String,
    price: Number,
    photos: [String],
    manufacturerId: {
      type: Schema.Types.ObjectId,
      ref: "Manufacturer", 
    },
  },
  {
    timestamps: true,
  }
);

ProductSchema.index({ locationPoints: "2dsphere" });

//return the model
module.exports = mongoose.model("Product", ProductSchema);
