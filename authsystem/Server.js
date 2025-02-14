require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB=require('./Utils&config/DB_Config');
const cookieParser = require("cookie-parser");

// we can use these two packages to makes our api secure and log the req detail like morgan is used to log the method,data ;
// 1 .const morgan = require("morgan");

// const helmet = require("helmet"); 
// 1.Prevents Security Attacks: Helps mitigate cross-site scripting (XSS), clickjacking, MIME sniffing, etc.
//  Sets Secure HTTP Headers: Automatically configures security-related headers.
//  Easy to Use: One-liner setup for improved security.


const app = express();


// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(cors({ origin: 'http://localhost:5173', credentials: true,exposedHeaders: ["Authorization"] }));
app.use(cookieParser());


const { errorHandler, notFoundHandler } = require("./middleware/ErrorHandler.Middleware");
const handleError=require('./middleware/ErrorHandler.utils');


// Sample Route
app.get("/api/data", (req, res,next) => {
    // next(handleError(403, "Access denied"));
    res.json({ success: true, message: "Hello from the API", data: { name: "Sahil", role: "Developer" } });
});


// app.get("/check-headers", (req, res) => {
    //     console.log(req.headers); // Logs all headers
    //     res.json({ success: true, headers: req.headers });
    // });
    
    
              // Auth routes
app.use("/api/auth",require('./Routes/authRoutes'));


// Undefined Routes Handler
app.use(notFoundHandler);
// Global Error Handler
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
