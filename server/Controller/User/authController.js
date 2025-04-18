import { oauth2Client } from "../../utils/googleConfig.js";
import User from "../../models/userAuthentication.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import axios from "axios";

dotenv.config();

export const googleLogin = async (req, res) => {
    try {
        const { code } = req.query;
        console.log("Received code:", code); // Log the received code
        if (!code) {
            return res.status(400).json({
                success: false,
                message: "Authorization code is required",
            });
        }

        let googleRes;
        try {
            googleRes = await oauth2Client.getToken(code);
        } catch (error) {
            console.error("Error exchanging code for tokens:", error);
            return res.status(400).json({
                success: false,
                message: "Invalid or expired authorization code",
            });
        }
        oauth2Client.setCredentials(googleRes.tokens);

        let userRes;
        try {
            userRes = await axios.get(
                `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${googleRes.tokens.access_token}`
            );
        } catch (error) {
            console.error("Error fetching user info:", error);
            return res.status(500).json({
                success: false,
                message: "Failed to fetch user information from Google",
            });
        }

        const { email, name, picture } = userRes.data;
        if (!email || !name) {
            return res.status(400).json({
                success: false,
                message: "Incomplete user data from Google",
            });
        }

        let user;
        try {
            user = await User.findOne({ email });
            if (!user) {
                user = await User.create({
                    name,
                    email,
                    image: picture || "",
                });
            }
        } catch (error) {
            console.error("Database error:", error);
            return res.status(500).json({
                success: false,
                message: "Database operation failed",
            });
        }

        const { _id } = user;

        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET is not defined");
            return res.status(500).json({
                success: false,
                message: "Server configuration error",
            });
        }

        const token = jwt.sign({ _id, email }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                name: user.name,
                email: user.email,
                image: user.image,
            },
        });
    } catch (error) {
        console.error("Unexpected error in googleLogin:", error);
        return res.status(500).json({
            success: false,
            message: "An unexpected error occurred during login",
            error: error.message, // Include error message for debugging
        });
    }
};