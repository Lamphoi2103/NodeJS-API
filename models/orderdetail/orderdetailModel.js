const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;
const orderDetail = new Schema({
    id: { type: ObjectId },
    product: { type: ObjectId, ref: 'product' },
    orderID: { type: ObjectId, ref: 'order' },
    quantity: { type: Number },
    price: { type: Number },
});
module.exports = mongoose.models.orderDetail || mongoose.model('orderdetail', orderDetail);