const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;
const category = new Schema({
    id: { type: ObjectId }, //khoa chinh
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 50,
        default: 'No name'
    },
});
module.exports = mongoose.models.category || mongoose.model('category', category);

