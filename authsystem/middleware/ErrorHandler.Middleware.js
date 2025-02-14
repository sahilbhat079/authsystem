const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(statusCode).json({
        success: false,
        message,
    });
};

const notFoundHandler = (req, res, next) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
};

module.exports = { errorHandler, notFoundHandler };
