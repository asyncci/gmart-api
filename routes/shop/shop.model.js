var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ShopSchema = new Schema({
    _id: Schema.Types.ObjectId,
    longitude: Number,
    latitude: Number,
    container_number: Number,
}, {
    timestamp: true,
});

module.exports = mongoose.model('Shop', ShopSchema);
