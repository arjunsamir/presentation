const path = require('path');

// Define App Error Class
class AppError extends Error {

    constructor(message, statusCode) {

        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);

    }

}

const handleCastErrorDB = err => {
    const message = `Invalid ${err.path}: ${err.value}`;
    return new AppError(message, 400);
}


const handleDuplicateFieldsDB = err => {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    const message = `Duplicate Field Value ${value}: Please use another value!`;
    return new AppError(message, 400);
}


const handleValidationErrorDB = err => {

    const errors = Object.values(err.errors).map(e => e.message);

    const message = `Invalid input data. ${errors.join('. ')}`;
    return new AppError(message, 400);
}


const handleJWTError = () => new AppError('Invalid token. Please log in again.', 401);


const handleJWTExpiredError = () => new AppError('Your token has expired! Please log in again', 401);


const developmentError = ( err, req, res ) => {

    // API Error
    if (req.originalUrl.startsWith('/api')) {

        console.error('ERROR 🤬', err.name);
        console.error(err);

        res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack
        });

    }
    //Rendered Website Error
    else {
        //res.redirect('/lost-traveller');
    }
    

}


const productionError = ( err, req, res ) => {

    // API ERROR
    if (req.originalUrl.startsWith('/api')) {

        // Operational, trusted error: send message to client
        if (err.isOperational) {
             return res.status(err.statusCode).json({
                status: err.status,
                message: err.message
            });
        }

        // 1. Log Error
        console.error('ERROR 🤬', err);


        // 2. Send generic message
        return res.status(500).json({
            status: 'error',
            message: 'Something went very wrong.'
        });

    }


    // RENDERED ERROR
    else {
        // Operational, trusted error: send message to client
        if (err.isOperational) {
            return res.status(err.statusCode).render('error', {
                title: 'Something went wrong!',
                msg: err.message
            });
        }

        // 1. Log Error
        console.error('ERROR 🤬', err);


        // 2. Send generic message
        res.redirect('/lost-traveller');
    }

}


module.exports = (err, req, res, next) => {

    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'development') developmentError(err, req, res);

    else if (process.env.NODE_ENV === 'production') {

        let error = err;

        if (err.name === 'CastError') error = handleCastErrorDB(err);
        if (err.code === 11000) error = handleDuplicateFieldsDB(err);
        if (err.name === 'ValidationError') error = handleValidationErrorDB(err);
        if (err.name === 'JsonWebTokenError') error = handleJWTError();
        if (err.name === 'TokenExpiredError') error = handleJWTExpiredError();

        productionError(error, req, res);
    }

    next();

}