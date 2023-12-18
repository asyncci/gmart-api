var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ShopSchema = new Schema({
<<<<<<< HEAD
    _id: Schema.Types.ObjectId,
    longitude: Number,
    latitude: Number,
    container_number: Number,
=======
    container: String,
    longitude: Number,
    latitude: Number,
    //no photos for now
    photos: [],
    keywords: [],
    our: Boolean,
    //checkbox working with us
>>>>>>> dfd0a5f (dock)
}, {
    timestamp: true,
});

module.exports = mongoose.model('Shop', ShopSchema);
