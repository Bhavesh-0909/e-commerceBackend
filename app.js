const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();

//********middleware*******
app.use(express.json());
app.use(cookieParser());

//********routes**********

module.exports = app;