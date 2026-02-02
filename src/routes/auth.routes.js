// src/routes/auth.routes.js
const router = require("express").Router();
const { register, login } = require("../controllers/auth.controller");

// تأكدي إن الدوال دي موجودة فعلاً ومش undefined
if (!register || !login) {
  console.error("Error: Register or Login functions are undefined in auth.controller!");
}

router.post("/register", register);
router.post("/login", login);

module.exports = router;