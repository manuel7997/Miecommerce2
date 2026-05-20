// 📋 Obtener carrito de la sesión
const getCart = (session) => {
    return session.cart || [];
};
 
// 💾 Guardar carrito en la sesión
const saveCart = (session, cart) => {
    session.cart = cart;
};
 
// ➕ Agregar producto o incrementar cantidad
const addItem = (session, productId) => {
    const cart = getCart(session);
    const existing = cart.find(item => item.productId === productId);
 
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ productId, quantity: 1 });
    }
 
    saveCart(session, cart);
};
 
// ➕ Aumentar cantidad de un producto
const increaseItem = (session, productId) => {
    const cart = getCart(session);
    const item = cart.find(i => i.productId === productId);
 
    if (item) item.quantity += 1;
 
    saveCart(session, cart);
};
 
// ➖ Disminuir cantidad — elimina el ítem si llega a 0
const decreaseItem = (session, productId) => {
    let cart = getCart(session);
    const index = cart.findIndex(i => i.productId === productId);
 
    if (index !== -1) {
        cart[index].quantity -= 1;
 
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
    }
 
    saveCart(session, cart);
};
 
// ❌ Eliminar un producto del carrito
const removeItem = (session, productId) => {
    const cart = getCart(session).filter(i => i.productId !== productId);
    saveCart(session, cart);
};
 
// 🗑️ Vaciar carrito
const clearCart = (session) => {
    saveCart(session, []);
};
 
// 💰 Calcular total combinando sesión con datos reales de productos
const calcTotal = (cartItems) => {
    return cartItems.reduce((sum, item) => sum + item.subtotal, 0);
};
 
// 🧾 Construir ítems del carrito con datos del producto
const buildCartItems = (session, getProductById) => {
    const cart = getCart(session);
 
    return cart.map(item => {
        const product = getProductById(item.productId);
        return {
            ...product,
            quantity: item.quantity,
            subtotal: product.price * item.quantity
        };
    });
};
 
module.exports = {
    addItem,
    increaseItem,
    decreaseItem,
    removeItem,
    clearCart,
    calcTotal,
    buildCartItems
};