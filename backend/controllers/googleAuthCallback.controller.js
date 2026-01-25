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

    const state = crypto.randomBytes(16).toString("hex");

    res.cookie("oauth_state", state, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: 10 * 60 * 1000,
    });

    const params = {
        client_id: process.env.GOOGLE_CLIENT_ID,
        redirect_uri: process.env.GOOGLE_CALLBACK_URL,
        response_type: "code",
        scope: "openid email profile",
        access_type: "offline",
        prompt: "consent",
        state
    };

    const googleAuthUrl =
        "https://accounts.google.com/o/oauth2/v2/auth?" +
        querystring.stringify(params);

    return res.redirect(googleAuthUrl);
};

const googleAuthCallback = async (req, res) => {
    try {
        const { code, state } = req.query;
        if (!code) {
            return res.redirect(
                `${process.env.FRONTEND_URL}/auth/login?error=oauth_missing_code`
            );
        }

        if (state !== req.cookies.oauth_state) {
            return res.redirect(
                `${process.env.FRONTEND_URL}/auth/login?error=oauth_invalid_state`
            );
        }

        res.clearCookie("oauth_state", {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
        });

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
            return res.redirect(
                `${process.env.FRONTEND_URL}/auth/login?error=google_email_not_verified`
            );
        }

        let user = await User.findOne({ email });

        if (user && user.authProvider === "local") {
            return res.redirect(
                `${process.env.FRONTEND_URL}/auth/login?error=email_exists`
            );
        }

        if (!user) {
            user = await User.create({
                firstName: given_name || "",
                lastName: family_name || "",
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
                ...cookieOptions,
                maxAge: refreshTokenExpiry,
            });

        return res.redirect(`${process.env.FRONTEND_URL}/home`);
    } catch (error) {
        console.error("Google Auth Error:", error);
        return res.redirect(
            `${process.env.FRONTEND_URL}/auth/login?error=oauth_failed`
        );
    }
};


module.exports = { googleAuthStart, googleAuthCallback };
