const express = require('express');
const router = express.Router();
const { getProducts, getProductById, searchProducts } = require('../controllers/productController');
 
router.get('/', getProducts);
router.get('/product/:id', getProductById);
router.get('/search', searchProducts);
 
module.exports = router;