var express = require('express');
var router = express.Router();
var categoryModel = require("../models/category/categoryModel");
/* GET users listing. */
router.get('/', async function (req, res, next) {
  // res.render('users');
  let data = await categoryModel.find();
  // res.send('Get all items')
  res.json(data)
});

router.get("/:id", async (req, res, next) => {
  try {
    const category = await categoryModel.findById(req.params.id);
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/add", async (req, res, next) => {
  try {
    const newCategory = new categoryModel(req.body);
    const saveCategory = await newCategory.save();
    res.status(200).json(saveCategory);
  } catch (error) {
    res.status(500).json(error);
  }
});


router.put("/edit/:id", async (req, res, next) => {
  // res.send('edit item wiht id = '+ req.params.id);
  try {
    const itemId = req.params.id;
    const updateFields = req.body;
    const item = await categoryModel.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Mục không tồn tại' });
    }
    Object.assign(item, updateFields);
    await item.save();

    res.status(200).json({ message: "Mục đã được chỉnh sửa thành công" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/delete/:id", async (req, res, next) => {
  try {
    const deletecategory = await categoryModel.findByIdAndDelete(req.params.id);
    res.status(200).json(deletecategory);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
