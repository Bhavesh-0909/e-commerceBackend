const express = require('express');
const router = express.Router();

//controller
const {createCategory, getAllCategory, deleteCategory} = require('../controller/category.controller');

//middleware
const {auth, isAdmin} = require('../middleware/auth.middleware')

router.post('/create/category', auth, isAdmin, createCategory);
router.get('/getCategory', auth, getAllCategory);
router.delete('/delete/category/:id', auth, isAdmin, deleteCategory);

module.exports = router;