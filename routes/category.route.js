const express = require('express');
const router = express.Router();

//controller
const {createCategory, getAllCategory} = require('../controller/category.controller');

//middleware
const {auth, isAdmin} = require('../middleware/auth.middleware')

router.post('/create/category', auth, isAdmin, createCategory);
router.get('/getCategory', auth, getAllCategory);

module.exports = router;