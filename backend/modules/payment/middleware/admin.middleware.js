const isAdmin = (req, res, next) => {
  if (String(req.user.userId) !== String(process.env.ADMIN_USER_ID)) {
    return res.status(403).json({ message: "Admin access only" });
  }
  next();
};

module.exports = isAdmin;
