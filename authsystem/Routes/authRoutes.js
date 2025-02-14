const express = require("express");
const { registerUser, loginUser, getUserProfile,logoutUser } = require("../Controlers/authController");
const { protect } = require("../middleware/RouteProtect.middleware");
const { body } = require("express-validator");

const router = express.Router();


router.post(
    "/register",
    [
        body("name", "Name is required").notEmpty(),
        body("email", "Invalid email").isEmail(),
        body("password", "Password must be at least 6 characters").isLength({ min: 6 }),
    ],
    registerUser
);

router.post(
    "/login",
    [
        body("email", "Invalid email").isEmail(),
        body("password", "Password is required").notEmpty(),
    ],
    loginUser
);
router.post("/logout", logoutUser);
router.get("/profile", protect, getUserProfile);

module.exports = router;
