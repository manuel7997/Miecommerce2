const express = require('express');
const router = express.Router();
const { getLogin, getRegister, postRegister } = require('../controllers/authController');

router.get('/login', getLogin);
router.get('/register', getRegister);
router.post('/register', postRegister);

module.exports = router;