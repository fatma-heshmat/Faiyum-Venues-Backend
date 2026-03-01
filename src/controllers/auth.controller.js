const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// دالة تسجيل مستخدم جديد مع شروطك
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // شروط التحقق (الإيميل والباسورد)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return res.status(400).json({ message: "Invalid email format" });

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(password)) return res.status(400).json({ message: "Password too weak" });

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, role });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.status(201).json({ id: user._id, email: user.email, token });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

// دالة تسجيل الدخول مع مطابقة البيانات
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // مطابقة كلمة المرور المدخلة مع المشفرة في الداتابيز
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ id: user._id, email: user.email, role: user.role, token });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

