const products = require('../models/productModel');
 
// 📂 Mostrar productos por categoría
const getByCategory = (req, res) => {
    const category = req.params.category.toLowerCase();
    const filtered = products.filter(p => p.category === category);
 
    res.render('pages/category', { category, products: filtered });
};
 
module.exports = { getByCategory };