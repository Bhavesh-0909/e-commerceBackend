const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();

//********middleware*******
app.use(express.json());
app.use(cookieParser());

//********routes**********
const authRoutes = require('./routes/auth.route');
const categoryRoutes = require('./routes/category.route')
const cartRoutes = require('./routes/cart.route');
const productRoutes = require('./routes/product.route')
const orderRoutes = require('./routes/order.route')


app.use('/api/v1', authRoutes);
app.use('/api/v1', categoryRoutes);
app.use('/api/v1/', cartRoutes);
app.use('/api/v1/', productRoutes);
app.use('/api/v1/', orderRoutes);

module.exports = app;