var express = require('express');
var router = express.Router();

// upload files
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });


var orderDetail = require("../models/orderdetail/orderdetailModel");

router.get('/', async function (req, res, next) {
    let data = await orderDetail.find();
    res.json(data);
});
router.post("/add", async (req, res, next) => {
    try {
        const { quantity, price, orderID, productID } = req.body;
        // if (!name || !email || !phone || !address || !total) {
        //     return res.status(400).json({ message: " vui lòng nhập đầy đủ thông tin" })
        // }
        const newDetailorders = new orderDetail({
            quantity,
            price,
            orderID,
            productID
        });
        const saveDetailorders = await newDetailorders.save();

        res.status(201).json(saveDetailorders);
    } catch (error) {
        res.status(500).json(error);
    }
});


module.exports = router;