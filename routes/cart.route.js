const express = require('express');
const router = express.Router();

//controller
const {insertProductInCart, removeProductFromCart} = require('../controller/cart.controller');

//middleware
const {auth, isConsumer} = require('../middleware/auth.middleware')

router.post('/insert', auth, isConsumer, insertProductInCart);
router.delete('/remove/:id', auth, isConsumer, removeProductFromCart);

module.exports = router;