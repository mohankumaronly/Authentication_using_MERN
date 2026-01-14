const axios = require("axios");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/auth.model");
const querystring = require("querystring");
const RefreshToken = require("../models/auth.refreshToken");

const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
};

const googleAuthStart = (req, res) => {
    const params = {
        client_id: process.env.GOOGLE_CLIENT_ID,
        redirect_uri: process.env.GOOGLE_CALLBACK_URL,
        response_type: "code",
        scope: "openid email profile",
        access_type: "offline",
        prompt: "consent",
    };

    const googleAuthUrl =
        "https://accounts.google.com/o/oauth2/v2/auth?" +
        querystring.stringify(params);

    return res.redirect(googleAuthUrl);
};

module.exports = { googleAuthStart };


const googleAuthCallback = async (req, res) => {
    try {
        const { code } = req.query;

        if (!code) {
            return res.status(400).json({
                success: false,
                message: "Authorization code missing",
            });
        }

        const tokenResponse = await axios.post(
            "https://oauth2.googleapis.com/token",
            {
                client_id: process.env.GOOGLE_CLIENT_ID,
                client_secret: process.env.GOOGLE_CLIENT_SECRET,
                code,
                redirect_uri: process.env.GOOGLE_CALLBACK_URL,
                grant_type: "authorization_code",
            }
        );

        const { id_token } = tokenResponse.data;

        const googleUser = await axios.get(
            `https://oauth2.googleapis.com/tokeninfo?id_token=${id_token}`
        );

        const {
            sub: googleId,
            email,
            given_name,
            family_name,
            email_verified,
        } = googleUser.data;

        if (!email_verified) {
            return res.status(403).json({
                success: false,
                message: "Google email not verified",
            });
        }

        let user = await User.findOne({ email });

        if (user && user.authProvider === "local") {
            return res.status(400).json({
                success: false,
                message:
                    "This email is registered with email & password. Please login normally.",
            });
        }

        if (!user) {
            user = await User.create({
                firstName: given_name,
                lastName: family_name,
                email,
                authProvider: "google",
                googleId,
                isEmailVerified: true,
            });
        }

        const accessToken = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "15m" }
        );

        const rawRefreshToken = crypto.randomBytes(40).toString("hex");
        const hashedRefreshToken = crypto
            .createHash("sha256")
            .update(rawRefreshToken)
            .digest("hex");

        const refreshTokenExpiry = 7 * 24 * 60 * 60 * 1000;

        await RefreshToken.create({
            userId: user._id,
            token: hashedRefreshToken,
            expiresAt: Date.now() + refreshTokenExpiry,
        });

        res
            .cookie("accessToken", accessToken, {
                ...cookieOptions,
                maxAge: 15 * 60 * 1000,
            })
            .cookie("refreshToken", rawRefreshToken, {
                cookieOptions,
                maxAge: refreshTokenExpiry,
            });

        return res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
    } catch (error) {
        console.error("Google Auth Error:", error);
        return res.status(500).json({
            success: false,
            message: "Google authentication failed",
        });
    }
};

module.exports = { googleAuthStart, googleAuthCallback };
