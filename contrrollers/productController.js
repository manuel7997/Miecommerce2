const products = require('../models/productModel');
 
// 🔀 Función para obtener hasta N productos aleatorios
const getRandomProducts = (arr, max = 5) => {
    const shuffled = [...arr].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, max);
};
 
// 🏠 Mostrar home con sugeridos y más pedidos
const getProducts = (req, res) => {
    const suggested = getRandomProducts(products, 5);
    const featured = products.filter(p => p.featured).slice(0, 10);
    res.render('pages/index', { products: suggested, featured });
};
 
// 📦 Mostrar detalle de un producto + relacionados por categoría
const getProductById = (req, res) => {
    const product = products.find(p => p.id == req.params.id);
 
    if (!product) {
        return res.status(404).render('pages/404');
    }
 
    // Buscar relacionados: misma categoría, excluyendo el producto actual
    let related = [];
    if (product.category) {
        const sameCategory = products.filter(
            p => p.category === product.category && p.id !== product.id
        );
 
        // Si hay más de 4, elegir 4 al azar
        related = sameCategory.length > 4
            ? getRandomProducts(sameCategory, 4)
            : sameCategory;
    }
 
    res.render('pages/product', { product, related });
};
 
module.exports = { getProducts, getProductById };