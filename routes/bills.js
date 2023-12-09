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


var billsModel = require("../models/order/orderModel");

router.get('/', async function (req, res, next) {
    let data = await billsModel.find().populate("user");
    res.json(data);
});

router.get("/:id", async (req, res, next) => {
    try {
        const order = await billsModel.findById(req.params.id).populate("user");
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json(error);
    }
});
router.post("/add", async (req, res, next) => {
    try {
        const { user, total, orderDate, status } = req.body;
        const newBill = new billsModel({
            user,
            total,
            orderDate,
            status
        });
        const savedBill = await newBill.save();
        res.status(201).json(savedBill);
    } catch (error) {
        res.status(500).json(error);
    }
});


module.exports = router;