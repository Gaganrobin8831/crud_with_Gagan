const { ApiError } = require('./ApiError.utilitis');

const asyncHandler = (func) => {
    return async (req, res, next) => {
        try {
            await func(req, res, next); // Call the passed function
        } catch (error) {
            // Create an ApiError instance
            const apiError = new ApiError(
                error.statusCode || 500, // Default to 500 if statusCode is not set
                error.message || "An unexpected error occurred",
                error.errors || [] // Capture any additional error details
            );

            // Call the next middleware with the apiError
            next(apiError);
        }
    };
};

module.exports = { asyncHandler };
