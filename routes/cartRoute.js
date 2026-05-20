const express = require('express');
const router = express.Router();
const { getCart, addToCart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } = require('../controllers/cartController');

router.get('/cart', getCart);
router.get('/add-to-cart/:id', addToCart);
router.get('/cart/increase/:id', increaseQuantity);
router.get('/cart/decrease/:id', decreaseQuantity);
router.get('/cart/remove/:id', removeFromCart);
router.get('/cart/clear', clearCart);

module.exports = router;