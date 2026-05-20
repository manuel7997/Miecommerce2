const express = require('express');
const router = express.Router();
const { getByCategory } = require('../controllers/categoryController');
 
router.get('/categories/:category', getByCategory);
 
module.exports = router;