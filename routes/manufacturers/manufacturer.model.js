const mongoose = require('mongoose');

const ManufacturerSchema = new mongoose.Schema({
  name: String,
  keywords: [],
  description: String,
  comment: String,
  location: String,
  latitude: Number,
  longitude: Number,
  photos: []
}, {
  timestamps: true,
});

const Manufacturer = mongoose.model('Manufacturer', ManufacturerSchema);

module.exports = Manufacturer;
