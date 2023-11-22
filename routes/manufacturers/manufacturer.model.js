const mongoose = require('mongoose');

const ManufacturerSchema = new mongoose.Schema({
  name: {
    type: String,
    maxLength: 255,
    default: '',
  },
  keywords: {
    type: [String],
    default: [],
  },
  description: {
    type: String,
    default: '',
  },
  location: {
    type: String,
    maxLength: 255,
    default: '',
  },
  rating: {
    type: Number,
    default: null,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  website: {
    type: String,
    maxLength: 255,
    default: '',
  },
  contactInfo: {
    type: [String],
    default: [],
  },
  lat: {
    type: Number,
    default: null,
  },
  lng: {
    type: Number,
    default: null,
  },
  brand: {
    type: String,
    maxLength: 255,
    default: '',
  },
  photos: {
    type: [String],
    default: [],
  },
}, {
  timestamps: true,
});

const Manufacturer = mongoose.model('Manufacturer', ManufacturerSchema);

module.exports = Manufacturer;
