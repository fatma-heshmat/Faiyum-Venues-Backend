const express = require("express");
const router = express.Router();
// استدعاء الفانكشن من الكنترولر اللي عملناه
const { signUp } = require("../controllers/auth.controller");

// مسار التسجيل
// لاحظي إننا خليناه "/" عشان المسار في server.js هو "/api/signup"
// فبالتالي اللينك النهائي في بوست مان هيبقى آخره /api/signup بس
router.post("/", signUp);

module.exports = router;


module.exports = router;


