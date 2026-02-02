const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

// @desc    Register a new user
// @route   POST /api/auth/register
exports.register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // 1. التأكد من إدخال جميع الحقول
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("برجاء إدخال الاسم والإيميل والباسورد");
  }

  if (password.length < 8) {
    res.status(400);
    throw new Error("يجب أن يكون الباسورد 8 حروف على الأقل");
}
  
  // 2. [Advanced] التحقق من صيغة الإيميل (Regex)
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailRegex.test(email)) {
    res.status(400);
    throw new Error("من فضلك أدخل إيميل صحيح (مثال: name@example.com)");
  }

  // 3. [Advanced] التحقق من قوة الباسورد
  // الشرط: 8 حروف على الأقل، يحتوي على حرف واحد كبير، حرف صغير، ورقم
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  if (!passwordRegex.test(password)) {
    res.status(400);
    throw new Error(
      "الباسورد ضعيف! يجب أن يكون 8 حروف على الأقل ويحتوي على (حرف كبير، حرف صغير، ورقم)"
    );
  }

  // 2. التأكد من أن المستخدم غير مسجل مسبقاً
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("هذا الإيميل مسجل بالفعل");
  }

  // 3. تشفير الباسورد
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // 4. إنشاء المستخدم في Compass
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role),
    });
  } else {
    res.status(400);
    throw new Error("بيانات المستخدم غير صالحة");
  }
});

// @desc    Login user
// @route   POST /api/auth/login
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // 1. البحث عن المستخدم
  const user = await User.findOne({ email });

  // 2. مقارنة الباسورد المشفر
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role),
    });
  } else {
    res.status(401);
    throw new Error("الإيميل أو كلمة المرور غير صحيحة");
  }
});

// دالة مساعدة لإنشاء التوكن (JWT)
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

exports.register
exports.login