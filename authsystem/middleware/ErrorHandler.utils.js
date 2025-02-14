const ERROR_TYPES = require("../Utils&config/Constant_Error");

const handleError = (status, message) => {
    let errorResponse = {};

    if (status && !message) {
        const matchedError = Object.values(ERROR_TYPES).find((err) => err.statusCode === status);
        errorResponse = matchedError || ERROR_TYPES.INTERNAL_SERVER_ERROR;
    } else if (!status && message) {
        errorResponse = { statusCode: 400, message };
    } else if (status && message) {
        errorResponse = { statusCode: status, message };
    } else {
        errorResponse = ERROR_TYPES.INTERNAL_SERVER_ERROR;
    }

    return Object.assign(new Error(errorResponse.message), { statusCode: errorResponse.statusCode });
};

module.exports = handleError;
