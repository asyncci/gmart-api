//Load Packages
<<<<<<< HEAD
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
=======
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
	name: String,
	categories: { type: [Schema.ObjectId], ref: 'Category' }, 
  description: String,
  price: Number,
  specialPrice: Number,
  photos: [String],
  popular: Boolean,
  quantity: Number,
  visible: { type: Boolean, default: true },
  location: String,
	locationPoints: {
		type: { type: String, enum: ['Point'] },
		coordinates: { type: [Number] }
	},
  additionalDetails: [String]
}, {
  timestamps: true
});

ProductSchema.index({ "locationPoints": "2dsphere" });

//return the model
module.exports = mongoose.model('Product', ProductSchema);
>>>>>>> dfd0a5f (dock)
