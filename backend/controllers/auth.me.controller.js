const jwt = require("jsonwebtoken");
const User = require("../models/auth.model");

const getMe = async (req, res) => {
    try {
        const token = req.cookies.accessToken;

        if (!token) {
            return res.status(401).json({ authenticated: false });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(401).json({ authenticated: false });
        }

        return res.status(200).json({
            authenticated: true,
            user,
        });

    } catch (err) {
        return res.status(401).json({ authenticated: false });
    }
};

module.exports = getMe;
