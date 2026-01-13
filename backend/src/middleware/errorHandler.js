export const errorHandler = (err, req, res, next) => {
    const statusCode = err.status || 500;
    const message = err.message || 'Internal Server Error';

    console.error(`[Error] ${statusCode} - ${message}`, {
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
        url: req.originalUrl,
        method: req.method,
    });

    res.status(statusCode).json({
        status: 'error',
        message,
    });
};
