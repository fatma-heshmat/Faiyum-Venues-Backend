const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 1️⃣ التأكد من وجود كل الحقول
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2️⃣ التحقق من صيغة الإيميل (وجود @ ونقطة)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format (must include @ and .com)" });
    }

    // 3️⃣ التحقق من قوة الباسورد (8 حروف، حرف كبير، وحرف صغير)
    // الـ Regex ده بيتأكد من: 8 حروف على الأقل، حرف A-Z، وحرف a-z
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ 
        message: "Password must be at least 8 characters long and contain both uppercase and lowercase letters" 
      });
    }

    // 4️⃣ التأكد إن الإيميل مش متكرر
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // تكميلة الكود (التشفير والحفظ)
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: { id: newUser._id, username: newUser.username, email: newUser.email }
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
