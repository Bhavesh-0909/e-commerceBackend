const express = require('express');
const router = express.Router();

//controller
const {createProduct, getAllProduct, getDetailsOfProduct, updatingProduct, deleteProduct} = require('../controller/product.controller');

//middleware
const {auth, isProducer} = require('../middleware/auth.middleware')

router.post('/create/product', auth, isProducer, createProduct);
router.get('/getallproducts/:id', auth, getAllProduct);
router.get('/get/product/:id', auth, getDetailsOfProduct);
router.put('/update/product/:id', auth, isProducer, updatingProduct);
router.delete('/delete/product/:id', auth, isProducer, deleteProduct);

module.exports = router;