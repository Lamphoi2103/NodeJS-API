const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;
const product = new Schema({
    id: { type: ObjectId }, //khoa chinh
    name: { type: String },
    thumbnail: { type: Array },
    price: { type: Number },
    deription: { type: String },
    category: { type: ObjectId, ref: 'category' },
    date_time: { type: String },
    color: { type: Array },
});
module.exports = mongoose.models.product || mongoose.model('product', product);

