// middleware/errorMiddleware.js
const errorHandler = (err, req, res, next) => {
  // لو فيه خطأ ومحددناش Status Code بنخليها 500 (Server Error)
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  res.status(statusCode).json({
    message: err.message,
    // بنظهر الـ stack بتاع الخطأ بس في حالة الـ Development عشان نعرف المشكلة فين
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = errorHandler;