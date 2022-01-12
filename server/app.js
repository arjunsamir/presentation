// Import Things
const path = require('path');
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');
const compression = require('compression');
const cors = require('cors');
const errorHandler = require('./errorHandler');
const routes = require('./routes');

// Get DevMode
const devMode = process.env.NODE_ENV !== 'production';

// Create App
const app = express();

// Add Middleware
app.use(cors());
app.enable("trust proxy");

// Set Up Static Server
app.use(express.static(path.join(__dirname, '../client/build')));

// Use Security Middleware
app.use(helmet({ contentSecurityPolicy: false }));
if (!devMode) app.use('/api', rateLimit({ max: 100, windowMs: 1000 * 60 * 60, message: 'Too many requests from thie IP, please try again in an hour'}));
app.use(xss());

// Body Parsing
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(compression());

// Apply Routes
app.post('/api/authenticate', routes.authenticate);
app.post('/api/validate', routes.validateCode);
app.post('/api/end', routes.endPresentation);
// app.get('/api/presentation', routes.getPresentation);
app.get('*', routes.redirect)

// Global Error Handler
app.use(errorHandler);

// Export App
module.exports = app;