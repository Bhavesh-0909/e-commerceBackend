const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();

//********middleware*******
app.use(express.json());
app.use(cookieParser());

//********routes**********
const authrouter = require('./routes/auth.route');

app.use('/api/v1', authrouter);

module.exports = app;