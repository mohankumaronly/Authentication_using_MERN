const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require("../models/auth.model");
const RefreshToken = require("../models/auth.refreshToken");


const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
        } = req.body;
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const user = User.create({
            firstName,
            lastName,
            email,
            password: hashPassword,
        });
        await user.save()
        const { password: _, ...saveUserData } = user.toObject();
        return res.status(201).json({
            success: true,
            message: "user created successfully",
            data: saveUserData
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server internal error"
        });
    }
}

const login = async (req, res) => {
    try {
        const {
            email,
            password,
            rememberMe
        } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are require"
            })
        }
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials",
            })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }
        const accessToken = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "15m" }
        );
        const NewRefreshToken = crypto.randomBytes(40).toString('hex');
        const hashedRefreshToken = crypto
            .createHash("sha256")
            .update(NewRefreshToken)
            .digest("hex");
        const refreshTokenExpiry = rememberMe ? 30 * 24 * 60 * 60 * 1000 : 7 * 24 * 60 * 60 * 1000;
        await RefreshToken.create({
            userId: user._id,
            token: hashedRefreshToken,
            expiresAt: Date.now() + refreshTokenExpiry,
        })
        const { password: _, ...safeUserData } = user.toObject();
        return res
            .cookie("accessToken", accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: 'lax',
                maxAge: 15 * 60 * 1000,
            })
            .cookie("refreshToken", NewRefreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: 'lax',
                maxAge: refreshTokenExpiry
            })
            .status(200)
            .json({
                success: true,
                message: "User logged in successfully",
                data: safeUserData
            });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server internal error"
        });
    }
}

const logOut = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (refreshToken) {
            const hashedToken = crypto
                .createHash("sha256")
                .update(refreshToken)
                .digest("hex");

            await RefreshToken.findOneAndUpdate(
                { token: hashedToken },
                { revoked: true }
            );
        }

        return res
            .clearCookie("accessToken", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: 'lax',
            })
            .clearCookie("refreshToken", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: 'lax',
            })
            .status(200)
            .json({
                success: true,
                message: "User logout successfully",
            });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server internal error"
        });
    }
}



module.exports = {
    register,
    login,
    logOut
}