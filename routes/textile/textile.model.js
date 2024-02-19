const mongoose = require("mongoose");

const textileSchema = new mongoose.Schema({
  source: { type: String, default: null },
  codeKent: { type: String, unique: true, required: true },
  codeKent0: { type: String, default: null },
  codeChina: { type: String, default: null },
  nameRussian: { type: String, default: null },
  nameChinese: { type: String, default: null },
  nameEnglish: { type: String, default: null },
  subCat: { type: String, default: null },
  priceChinaKG: { type: Number, default: 0 },
  priceChinaMeter: { type: Number, default: 0 },
  width: { type: Number, default: 0 },
  gram: { type: Number, default: 0 },
  marketPrice: { type: Number, default: 0 },
  imageURL: [{ type: String }], 
  note: { type: String, default: null },
  currentPrice: { type: Number, default: 0 },
  isPluff: { type: Boolean, default: false },
  isResToChina: { type: Boolean, default: false },
  isKentSample: { type: Boolean, default: false },
  staff: { type: String, default: null },
  client: { type: String, default: null },
  description: { type: String, default: null, maxlength: 1000 },
  isPopular: { type: Boolean, default: false },
  priceUpdated: { type: Number, default: 0 }
}, {
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } // Mongoose uses 'timestamps' option to handle createdAt and updatedAt automatically
});

const textile = mongoose.model("Textile", textileSchema);

module.exports = textile;
