const products = require('../models/productModel');

// 🔀 Obtener hasta N productos aleatorios
const getRandomProducts = (arr, max = 5) => {
    const shuffled = [...arr].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, max);
};

// 🏠 Productos para el home: sugeridos y destacados
const getHomeProducts = () => {
    const suggested = getRandomProducts(products, 5);
    const featured = products.filter(p => p.featured).slice(0, 10);
    return { suggested, featured };
};

// 📦 Producto por ID
const getProductById = (id) => {
    return products.find(p => p.id === parseInt(id)) || null;
};

// 🔗 Productos relacionados: misma categoría, excluyendo el actual
const getRelatedProducts = (product) => {
    if (!product.category) return [];

    const sameCategory = products.filter(
        p => p.category === product.category && p.id !== product.id
    );

    return sameCategory.length > 4
        ? getRandomProducts(sameCategory, 4)
        : sameCategory;
};

// 📂 Productos por categoría
const getProductsByCategory = (category) => {
    return products.filter(p => p.category === category);
};

// ✅ Verificar si un producto tiene stock
const hasStock = (id) => {
    const product = getProductById(id);
    return product ? product.stock > 0 : false;
};

// 🔃 Ordenar productos por precio — solo acepta 'asc' o 'desc'
const sortByPrice = (arr, order) => {
    if (order !== 'asc' && order !== 'desc') return arr;

    return [...arr].sort((a, b) =>
        order === 'asc' ? a.price - b.price : b.price - a.price
    );
};

// 🔍 Buscar productos por nombre (coincidencia parcial, case-insensitive)
const searchByName = (query) => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return [];

    return products.filter(p =>
        p.name.toLowerCase().includes(normalized)
    );
};

module.exports = {
    getHomeProducts,
    getProductById,
    getRelatedProducts,
    getProductsByCategory,
    hasStock,
    sortByPrice,
    searchByName
};