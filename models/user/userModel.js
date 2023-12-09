const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;
const user = new Schema({
    id: { type: ObjectId }, //khoa chinh
    name: { type: String },
    password: { type: String },
    email: { type: String },
    address: { type: String },
    phone: { type: String },
    role: { type: Number },
    thumbnail: { type: String }
}, { versionKey: false });

// user.methods.isValidPassword = async function (password) {
//     const compare = await bcrypt.compare(password, this.password);
//     return compare;
// };
module.exports = mongoose.models.user || mongoose.model('user', user);
