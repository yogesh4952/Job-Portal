import { oauth2Client } from "../../utils/googleConfig.js";
import User from "../../models/userAuthentication.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

// Existing googleLogin, signup, login functions (unchanged from April 19, 2025, 12:49)
export const googleLogin = async (req, res) => {
    try {
        const { code } = req.body;
        console.log("Received code:", code);
        if (!code) {
            return res.status(400).json({
                success: false,
                message: "Authorization code is required",
            });
        }

        let googleRes;
        try {
            console.log("Exchanging code with Google...");
            googleRes = await oauth2Client.getToken(code);
            console.log("Token exchange successful:", !!googleRes.tokens.id_token);
        } catch (error) {
            console.error("Error exchanging code for tokens:", error.message, error);
            return res.status(400).json({
                success: false,
                message: "Invalid or expired authorization code",
                error: error.message,
            });
        }

        let payload;
        try {
            console.log("Verifying id_token...");
            const ticket = await oauth2Client.verifyIdToken({
                idToken: googleRes.tokens.id_token,
                audience: process.env.GOOGLE_CLIENT_ID,
            });
            payload = ticket.getPayload();
            console.log("ID token payload:", { email: payload.email, name: payload.name });
        } catch (error) {
            console.error("Error verifying id_token:", error.message, error);
            return res.status(500).json({
                success: false,
                message: "Failed to verify Google token",
                error: error.message,
            });
        }

        const { email, name, picture } = payload;
        if (!email || !name) {
            console.error("Incomplete user data:", { email, name, picture });
            return res.status(400).json({
                success: false,
                message: "Incomplete user data from Google",
            });
        }

        let user;
        try {
            console.log("Checking for existing user with email:", email);
            user = await User.findOne({ email });
            if (!user) {
                console.log("Creating new Google OAuth user...");
                user = await User.create({
                    name,
                    email,
                    image: picture || "",
                    authProvider: 'google',
                });
                console.log("User created:", user._id);
            } else if (user.authProvider === 'local') {
                console.log("Email already registered as local user:", email);
                return res.status(400).json({
                    success: false,
                    message: "Email already registered with email/password login. Please use that method.",
                });
            } else {
                console.log("Existing Google OAuth user found:", user._id);
            }
        } catch (error) {
            console.error("Database error:", error.message, error);
            return res.status(500).json({
                success: false,
                message: "Database operation failed",
                error: error.message,
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

        console.log("Login successful for user:", email);
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
        console.error("Unexpected error in googleLogin:", error.message, error);
        return res.status(500).json({
            success: false,
            message: "An unexpected error occurred during login",
            error: error.message,
        });
    }
};

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email, and password are required",
            });
        }

        let user = await User.findOne({ email });
        if (user) {
            if (user.authProvider === 'google') {
                return res.status(400).json({
                    success: false,
                    message: "Email registered with Google login. Please use Google to log in.",
                });
            }
            return res.status(400).json({
                success: false,
                message: "Email already registered with email/password",
            });
        }

        user = await User.create({
            name,
            email,
            password,
            authProvider: 'local',
        });

        const { _id } = user;
        const token = jwt.sign({ _id, email }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        return res.status(201).json({
            success: true,
            message: "Signup successful",
            token,
            user: {
                name: user.name,
                email: user.email,
                image: user.image,
            },
        });
    } catch (error) {
        console.error("Error in signup:", error);
        return res.status(500).json({
            success: false,
            message: "Signup failed",
            error: error.message,
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        const user = await User.findOne({ email });
        if (!user || user.authProvider !== 'local') {
            return res.status(401).json({
                success: false,
                message: "Invalid email or not registered with email/password",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid password",
            });
        }

        const { _id } = user;
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
        console.error("Error in login:", error);
        return res.status(500).json({
            success: false,
            message: "Login failed",
            error: error.message,
        });
    }
};

// New verify endpoint
export const verifyToken = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]; // Expect "Bearer <token>"
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "No token provided",
            });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            console.error("Error verifying token:", error.message);
            return res.status(401).json({
                success: false,
                message: "Invalid or expired token",
            });
        }

        const user = await User.findById(decoded._id).select('name email image');
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Token verified",
            user: {
                name: user.name,
                email: user.email,
                image: user.image,
            },
        });
    } catch (error) {
        console.error("Error in verifyToken:", error.message);
        return res.status(500).json({
            success: false,
            message: "Failed to verify token",
            error: error.message,
        });
    }
};