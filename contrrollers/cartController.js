const products = require('../models/productModel');

// 🛒 Ver carrito — combina sesión con datos reales del producto
const getCart = (req, res) => {
    const sessionCart = req.session.cart || [];

    // Combinar productId + quantity de la sesión con datos reales del modelo
    const cartItems = sessionCart.map(item => {
        const product = products.find(p => p.id === item.productId);
        return {
            ...product,
            quantity: item.quantity,
            subtotal: product.price * item.quantity
        };
    });

    const total = cartItems.reduce((sum, item) => sum + item.subtotal, 0);

    res.render('pages/cart', { cartItems, total });
};

// ➕ Agregar producto — solo guarda productId y quantity
const addToCart = (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);

    if (!product) return res.redirect('/');

    if (!req.session.cart) req.session.cart = [];

    const existing = req.session.cart.find(item => item.productId === productId);

    if (existing) {
        // Ya existe → incrementar cantidad
        existing.quantity += 1;
    } else {
        // No existe → agregar con cantidad 1
        req.session.cart.push({ productId, quantity: 1 });
    }

    res.redirect('/cart');
};

// ➕ Aumentar cantidad
const increaseQuantity = (req, res) => {
    const productId = parseInt(req.params.id);
    const item = req.session.cart && req.session.cart.find(i => i.productId === productId);

    if (item) item.quantity += 1;

    res.redirect('/cart');
};

// ➖ Disminuir cantidad — si llega a 0 se elimina
const decreaseQuantity = (req, res) => {
    if (!req.session.cart) return res.redirect('/cart');

    const productId = parseInt(req.params.id);
    const index = req.session.cart.findIndex(i => i.productId === productId);

    if (index !== -1) {
        req.session.cart[index].quantity -= 1;

        if (req.session.cart[index].quantity <= 0) {
            req.session.cart.splice(index, 1);
        }
    }

    res.redirect('/cart');
};

// ❌ Eliminar producto del carrito
const removeFromCart = (req, res) => {
    const productId = parseInt(req.params.id);
    req.session.cart = (req.session.cart || []).filter(i => i.productId !== productId);
    res.redirect('/cart');
};

// 🗑️ Vaciar carrito
const clearCart = (req, res) => {
    req.session.cart = [];
    res.redirect('/cart');
};

module.exports = { getCart, addToCart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart };