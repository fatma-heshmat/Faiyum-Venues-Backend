// middleware/upload.js
const multer = require('multer');
const path = require('path');

// تحديد مكان التخزين واسم الملف
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // الصور هتتحفظ في فولدر اسمه uploads
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // اسم فريد لكل صورة
  }
});

const upload = multer({ storage: storage });
module.exports = upload;