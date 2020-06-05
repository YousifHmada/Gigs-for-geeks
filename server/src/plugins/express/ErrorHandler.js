class ErrorHandler {
  constructor(context) {
    // eslint-disable-next-line consistent-return
    return (err, req, res, next) => {
      if (res.headersSent) {
        return next(err);
      }
      let statusCode = 500;
      let message = context.env.NODE_ENV === 'development' ? err.message : 'An unexpected error occurred.';
      if (err instanceof context.entities.CustomError) {
        message = err.getErrorMessage();
        statusCode = err.getStatusCode();
      } else {
        // eslint-disable-next-line no-console
        console.error(err);
      }
      res.status(statusCode);
      res.json({ success: false, message });
    };
  }
}

module.exports = ErrorHandler;
