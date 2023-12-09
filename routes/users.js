var express = require('express');
var router = express.Router();
var userModel = require("../models/user/userModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const privateKey = fs.readFileSync('private-key.txt');
// const middlewareController = require('./middlewareController')

// router.post('/login', async (req, res) => {
//   const { email, password } = req.body
//   try {
//     // Tìm người dùng trong database theo email
//     const user = await userModel.findOne({ email });
//     // Kiểm tra nếu có người dùng và mật khẩu hợp lệ
//     if (user && bcrypt.compareSync(password, user.password)) {
//       // Tạo thông tin người dùng để đưa vào token
//       const userInfo = {
//         id: user._id,
//         name: user.name,
//         role: user.role
//       };
//       const jwtToken = jwt.sign(userInfo, privateKey, { algorithm: 'RS256', expiresIn: 3600 });
//       // Trả về token và thông tin người dùng
//       res.status(200).json({ token: jwtToken, userInfo: userInfo });
//     } else {
//       // Trả về lỗi nếu đăng nhập thất bại
//       res.status(401).json({ message: 'Đăng nhập thất bại' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Đã xảy ra lỗi' });
//   }
// });

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await userModel.findOne({ email: email });
    if (!user) {
      res.status(404).json("Không tìm thấy người dùng")
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    )
    if (!validPassword) {
      res.status(404).json('Sai Password')
    }
    if (user && validPassword) {
      const accesToken = jwt.sign({
        id: user._id,
        role: user.role
      },
        privateKey, { algorithm: 'RS256', expiresIn: "1h" }
      )
      const { password, ...others } = user._doc;
      res.status(200).json({ ...others, accesToken })
    }
  } catch (e) {

  }
});

// function verifyToken(req, res, next) {
//   const token = req.headers.token;
//   if (token) {
//     const accesToken = token.split(" ")[1];
//     jwt.verify(accesToken, privateKey, (er, user) => {
//       if (er) {
//         res.status(403).json('Token đã hết hạn');
//       }
//       req.user = user;
//       next();
//     })
//   } else {
//     res.status(401).json('bạn chưa đăng nhập')
//   }
// }

/* GET users listing. */
router.get('/', async function (req, res, next) {
  let data = await userModel.find();
  res.json(data)
});
router.get("/:id", async (req, res, next) => {
  try {
    const user = await userModel.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/add", async (req, res, next) => {
  try {
    const { name, password, email, phone, role, thumbnail, address } = req.body;
    const newUser = new userModel({
      name,
      password,
      email,
      phone,
      role,
      thumbnail,
      address,
    });

    const saveUser = await newUser.save();
    res.status(200).json(saveUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

// router.put("/edit/:id", (req, res, next) => {

// });
router.put("/edit/:id", async (req, res, next) => {
  try {
    const itemId = req.params.id;
    const { name, thumbnail, email, password, phone, address, role } = req.body;
    const item = await userModel.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Mục không tồn tại' });
    }
    item.name = name;
    item.thumbnail = thumbnail;
    item.email = email;
    item.password = password;
    item.phone = phone;
    item.address = address;
    item.role = role;

    await item.save();

    res.status(200).json({ message: "Mục đã được chỉnh sửa thành công" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/delete/:id", async (req, res, next) => {
  try {
    const deleteuser = await userModel.findByIdAndDelete(req.params.id);
    res.status(200).json(deleteuser);
  } catch (error) {
    res.status(500).json(error);
  }
});



module.exports = router;
