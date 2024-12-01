const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');

dotenv.config();

const { handle404Error, handleGlobalError } = require('./middlewares');
const { v1Routes } = require('./routes/v1');
const { cors } = require('./config');

const app = express();

if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
    console.log(`Server starting in ${process.env.NODE_ENV || 'development'} mode`);
}

app.use(cors);
app.use(
    express.json({
        limit: '10mb',
        verify: (req, res, buf) => {
            req.rawBody = buf.toString();
        }
    })
);
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(cookieParser());

app.use((req, res, next) => {
    console.log(`\n${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
    console.log('Request Body:', JSON.stringify(req.body, null, 2));
    next();
});

app.use('/api/v1', v1Routes);

app.use(handle404Error);
app.use((err, req, res, next) => {
    console.error('\nError occurred:', err);
    console.error('Stack trace:', err.stack, '\n');
    next(err);
});
app.use(handleGlobalError);

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
});

module.exports = { app };
