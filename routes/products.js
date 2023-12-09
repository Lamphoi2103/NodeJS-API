var express = require('express');
var router = express.Router();

// upload files
// const multer = require('multer');
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname);
//   }
// });
// const upload = multer({ storage: storage });
/////////////


var productModel = require("../models/product/productModel");
/* GET users listing. */
router.get('/', async function (req, res, next) {
  let data = await productModel.find().populate("category");
  res.json(data);
});

router.get("/:id", async (req, res, next) => {
  try {
    const product = await productModel.findById(req.params.id).populate("category");
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/add", async (req, res) => {
  try {
    const { name, price, category, deription, date_time, thumbnail, color } = req.body;

    const newProduct = new productModel({
      name,
      thumbnail,
      price,
      category,
      deription,
      date_time,
      color
    });

    const saveProduct = await newProduct.save();
    res.status(200).json(saveProduct);
  } catch (error) {
    res.status(500).json(error);
  }
});


// post mutiple
// router.post("/add", upload.array('img', 12), async (req, res, next) => {
//   try {
//     const files = req.files; // Thông tin về các file đã tải lên
//     console.log(files);

//     // Lấy thông tin từ req.body và req.files và tạo một đối tượng mới để lưu trữ vào cơ sở dữ liệu
//     const newProduct = new productModel({
//       name: req.body.name,
//       thumbnail: files.map(file => file.filename),
//       price: req.body.price,
//       category_id: req.body.category_id,
//       deription: req.body.deription,
//       date_time: req.body.date_time
//     });

//     const saveProduct = await newProduct.save();
//     res.status(200).json(saveProduct);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });
router.put("/edit/:id", async (req, res, next) => {
  try {
    const itemId = req.params.id;
    const { name, thumbnail, price, date_time, category, color, deription } = req.body;
    const item = await productModel.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Mục không tồn tại' });
    }
    item.name = name;
    item.thumbnail = thumbnail;
    item.price = price;
    item.date_time = date_time;
    item.category = category;
    item.color = color;
    item.deription = deription;
    await item.save();

    res.status(200).json({ message: "Mục đã được chỉnh sửa thành công" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/delete/:id", async (req, res, next) => {
  try {
    const deleteproduct = await productModel.findByIdAndDelete(req.params.id);
    res.status(200).json(deleteproduct);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;