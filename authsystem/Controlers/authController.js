const jwt = require("jsonwebtoken");
const User = require("../Models/User");
const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");

// Generate an Access Token (short-lived)
const generateAccessToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "15m" });
};

// Generate a Refresh Token (long-lived)
const generateRefreshToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.REFRESH_SECRET, { expiresIn: "7d" });
};

// @desc Register User
exports.registerUser = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ name, email, password });
    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    // Set the access token in the Authorization header
    res.setHeader("Authorization", `Bearer ${accessToken}`);

    // Set the refresh token in an HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // use secure cookies in production
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        accessToken,
    });
});

// @desc Login User
exports.loginUser = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    // Set the access token in the Authorization header
    res.setHeader("Authorization", `Bearer ${accessToken}`);

    // Set the refresh token in an HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        accessToken,
    });
});

// @desc Get Profile (Protected)
exports.getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
});     


// @desc Get Profile (public)

exports.logoutUser = asyncHandler(async (req, res) => {
    // Clear the refresh token cookie.
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict"
    });
    
    res.status(200).json({ message: "Logged out successfully" });
});