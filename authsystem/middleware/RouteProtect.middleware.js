const jwt = require("jsonwebtoken");
const User = require("../Models/User");
const handleError = require("../middleware/ErrorHandler.utils");

exports.protect = async (req, res, next) => {
    let token;

    // Extract the Authorization header (case-insensitive)
    const authHeader = req.headers.authorization || req.headers.Authorization;

    // Check if the Authorization header exists and starts with "Bearer "
    if (authHeader && authHeader.startsWith("Bearer ")) {
        // Extract the access token from the Authorization header
        token = authHeader.split(" ")[1];

        try {
            // Verify the access token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");

            if (!req.user) {
                return next(handleError(401, "User not found"));
            }

            // Access token is valid, proceed to the next middleware
            return next();
        } catch (error) {
            // If the error is not due to token expiration, return an error
            if (error.name !== "TokenExpiredError") {
                return next(handleError(401, "Invalid token"));
            }

            // If the access token is expired, proceed to check for a refresh token
        }
    }

    // If the access token is missing or expired, check for a refresh token
    const refreshToken = req.cookies?.refreshToken;
    
    if (!refreshToken) {
        return next(handleError(401, "Unauthorized - No access token or refresh token"));
    }

    try {
        // Verify the refresh token
        const decodedRefresh = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
        const user = await User.findById(decodedRefresh.id).select("-password");

        if (!user) {
            return next(handleError(401, "Invalid refresh token"));
        }

        // Generate a new access token
        const newAccessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "15m" });

        // Set the new access token in the response header
        res.setHeader("Authorization", `Bearer ${newAccessToken}`);
        req.user = user;

        // Proceed to the next middleware
        return next();
    } catch (error) {
        return next(handleError(403, "Refresh token expired or invalid"));
    }
};