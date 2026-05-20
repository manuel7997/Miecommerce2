const { getProductsByCategory } = require('../services/productService');
 
// 📂 Mostrar productos por categoría
const getByCategory = (req, res) => {
    const category = req.params.category;
    const products = getProductsByCategory(category);
    res.render('pages/category', { category, products });
};
 
module.exports = { getByCategory };