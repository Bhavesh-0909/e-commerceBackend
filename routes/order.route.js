const express = require('express');
const router = express.Router();

//controller
const {createOrder, getOrderHistory, getOrder, updateOrder, deleteOrder} = require('../controller/order.controller');

//middleware
const {auth, isConsumer} = require('../middleware/auth.middleware')

router.get('/order/history', auth, isConsumer, getOrderHistory);
router.get('/order/:id', auth, isConsumer, getOrder);
router.post('/create/order/:id', auth, isConsumer, createOrder);
router.put('/update/order/:id', auth, isConsumer, updateOrder);
router.delete('/delete/order/:id', auth, isConsumer, deleteOrder);

module.exports = router;