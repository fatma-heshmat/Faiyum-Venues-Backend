const restrictTo = (...allowedRoles) => {
  return (req, res, next) => {
    
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "You are not logged in! Please log in to get access."
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Access Denied: Your account is unauthorized or restricted from accessing this route!"
      });
    }

    next();
  };
};

module.exports = { restrictTo };
