const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();

//********middleware*******
app.use(express.json());
app.use(cookieParser());

//********routes**********
const authRoutes = require('./routes/auth.route');
const categoryRoutes = require('./routes/category.route')

app.use('/api/v1', authRoutes);
app.use('/api/v1', categoryRoutes);

module.exports = app;