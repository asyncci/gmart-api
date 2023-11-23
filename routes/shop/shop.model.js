import { Schema, model } from "mongoose";

var ShopSchema = new Schema({
    marker_id: Schema.Types.ObjectId,
    longitude: Number,
    latitude: Number,
    container_number: Number,
});

module.export = model('Shop', ShopSchema);
