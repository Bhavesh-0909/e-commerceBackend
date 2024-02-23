const express = require('express');
const router = express.Router();

//controller
const {signupUser, loginUser, deleteUser} = require('../controller/auth.controller');

//middleware
const {auth} = require('../middleware/auth.middleware')

router.post('/signup', signupUser)
router.post('/login', loginUser)
router.delete('/delete/:id', auth, deleteUser)

module.exports = router;