const express = require('express');
const router = express.Router();

//controller
const {insertProductInCart, removeProductFromCart, updateCart, getAllProducts} = require('../controller/cart.controller');

//middleware
const {auth, isConsumer} = require('../middleware/auth.middleware')

router.get('/cart', auth, isConsumer, getAllProducts);
router.post('/insert/cart/:id', auth, isConsumer, insertProductInCart);
router.delete('/remove/:id', auth, isConsumer, removeProductFromCart);
router.put('/update/cart/:id', auth, isConsumer, updateCart)

module.exports = router;