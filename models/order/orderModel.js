const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;
const order = new Schema({
    id: { type: ObjectId },
    user: { type: ObjectId, ref: 'user' },
    total: { type: Number },
    orderDate: { type: Date, default: Date.now },
    status: { type: Number }
});
module.exports = mongoose.models.order || mongoose.model('order', order);