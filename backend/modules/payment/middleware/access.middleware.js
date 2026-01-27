const User = require("../../auth/models/auth.model");
const requirePaidAccess = async (req, res, next) => {
  try {

    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const user = await User.findById(userId).select("access");

    if (!user || !user.access || !user.access.isActive) {
      return res.status(403).json({
        message: "Payment required to access this resource",
      });
    }

    if (user.access.type === "LIFETIME") {
      return next();
    }

    if (user.access.type === "TIME_BASED") {
      const now = new Date();

      if (!user.access.endDate || now > new Date(user.access.endDate)) {

        user.access.isActive = false;
        await user.save();

        return res.status(403).json({
          message: "Access expired. Please renew your plan.",
        });
      }

      return next();
    }

    return res.status(403).json({
      message: "Access denied",
    });

  } catch (error) {
    console.error("Access middleware error:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = requirePaidAccess;

// // how to use

// router.get(
//   "/download-repo",
//   protect,
//   requirePaidAccess,
//   controller.downloadRepo
// );
