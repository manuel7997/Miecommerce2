const cartService = require('../services/cartService');
const { getProductById, hasStock } = require('../services/productService');
const normalizeId = require('../utils/normalizeId');
 
// 🛒 Ver carrito
const getCart = (req, res) => {
    const cartItems = cartService.buildCartItems(req.session, getProductById);
    const total = cartService.calcTotal(cartItems);
    res.render('pages/cart', { cartItems, total });
};
 
// ➕ Agregar producto
const addToCart = (req, res) => {
    const productId = normalizeId(req.params.id);
 
    if (!productId) return res.status(400).render('pages/400');
 
    const product = getProductById(productId);
 
    if (!product) return res.status(404).render('pages/404');
    if (!hasStock(productId)) return res.redirect('/');
 
    cartService.addItem(req.session, productId);
    res.redirect('/cart');
};
 
// ➕ Aumentar cantidad
const increaseQuantity = (req, res) => {
    const productId = normalizeId(req.params.id);
 
    if (!productId) return res.status(400).render('pages/400');
 
    cartService.increaseItem(req.session, productId);
    res.redirect('/cart');
};
 
// ➖ Disminuir cantidad
const decreaseQuantity = (req, res) => {
    const productId = normalizeId(req.params.id);
 
    if (!productId) return res.status(400).render('pages/400');
 
    cartService.decreaseItem(req.session, productId);
    res.redirect('/cart');
};
 
// ❌ Eliminar producto
const removeFromCart = (req, res) => {
    const productId = normalizeId(req.params.id);
 
    if (!productId) return res.status(400).render('pages/400');
 
    cartService.removeItem(req.session, productId);
    res.redirect('/cart');
};
 
// 🗑️ Vaciar carrito
const clearCart = (req, res) => {
    cartService.clearCart(req.session);
    res.redirect('/cart');
};
 
module.exports = { getCart, addToCart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart };