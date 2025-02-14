const ERROR_TYPES = {
    NOT_FOUND: { statusCode: 404, message: "Resource not found" },
    BAD_REQUEST: { statusCode: 400, message: "Invalid request data" },
    UNAUTHORIZED: { statusCode: 401, message: "Unauthorized access" },
    FORBIDDEN: { statusCode: 403, message: "Access forbidden" },
    INTERNAL_SERVER_ERROR: { statusCode: 500, message: "Something went wrong. Please try again later" },
};

module.exports = ERROR_TYPES;
