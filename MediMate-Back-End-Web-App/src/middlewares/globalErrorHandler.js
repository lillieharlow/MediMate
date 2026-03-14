/**
 * Global Error Handler:
 * - Catches all errors thrown by routes
 * - Formats them with standardized JSON
 * - Maps error types to appropriate HTTP status codes
 * - Logs errors for debugging
 */

// Map error names to HTTP status codes
const errorStatusMap = {
  ValidationError: 400,
  CastError: 400,
  JsonWebTokenError: 401,
  TokenExpiredError: 401,
  MongoServerError: 500,
  MongoNetworkError: 503,
};

const globalErrorHandler = (error, response, next) => {
  if (response.headersSent) {
    return next(error);
  }

  const status = errorStatusMap[error.name] || error.status || error.statusCode || 500;

  // Always provide a string message for error responses
    let message = 'Internal Server Error';
    if (error && typeof error.message === 'string' && error.message.trim()) {
      message = error.message;
    } else if (error && typeof error === 'string' && error.trim()) {
      message = error;
    }

  const errorResponse = {
    success: false,
    status,
    message,
    timestamp: new Date().toISOString(),
  };

  // Always provide errors as an array if present
  if (error.name === 'ValidationError' && error.errors) {
    errorResponse.errors = Object.values(error.errors).map((err) => ({
      field: err.path,
      message: err.message,
    }));
  } else if (Array.isArray(error.errors)) {
    errorResponse.errors = error.errors;
  }

  // Log the error for debugging
  console.error(
    `[${errorResponse.timestamp}] Error (${error.name || 'UnknownError'}):`,
    error.stack || error
  );

  // Always return JSON with a message
  return response.status(status).json(errorResponse);
};

module.exports = globalErrorHandler;
