const { getHomeProducts, getProductById, getRelatedProducts, sortByPrice, searchByName } = require('../services/productService');
const normalizeId = require('../utils/normalizeId');

// 🏠 Mostrar home con sugeridos y destacados — soporta ?sort=asc|desc
const getProducts = (req, res) => {
    const { suggested, featured } = getHomeProducts();
    const sort = req.query.sort;

    const sortedSuggested = sortByPrice(suggested, sort);
    const sortedFeatured = sortByPrice(featured, sort);

    res.render('pages/index', {
        products: sortedSuggested,
        featured: sortedFeatured,
        sort: sort || ''
    });
};

// 📦 Mostrar detalle de un producto + relacionados
const getProductByIdController = (req, res) => {
    const id = normalizeId(req.params.id);

    if (!id) return res.status(400).render('pages/400');

    const product = getProductById(id);

    if (!product) return res.status(404).render('pages/404');

    const related = getRelatedProducts(product);
    res.render('pages/product', { product, related });
};

// 🔍 Buscar productos por nombre
const searchProducts = (req, res) => {
    const query = req.query.query || '';
    const results = searchByName(query);

    res.render('pages/search', { results, query });
};

module.exports = { getProducts, getProductById: getProductByIdController, searchProducts };