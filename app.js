const express = require("express");
const app = express();
const path = require("path");

// 🛒 Carrito global
let cart = [];

// ⚙️ Configuración
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "assets")));


// 🏠 HOME
app.get("/", (req, res) => {

    const products = [
        { id: 1, name: "Nike Mercurial", price: 120000, img: "/img/nikemercurial.jpg" },
        { id: 2, name: "Adidas Predator", price: 110000, img: "/img/adidaspredator.jpg" },
        { id: 3, name: "Puma Future", price: 100000, img: "/img/pumafuture.jpg" }
    ];

    res.render("pages/index", { products });
});


// 📦 PRODUCTO
app.get("/product/:id", (req, res) => {

    const products = [
        {
            id: 1,
            name: "Nike Mercurial",
            price: 120000,
            img: "/img/nikemercurial.jpg",
            description: "Botines livianos ideales para velocidad."
        },
        {
            id: 2,
            name: "Adidas Predator",
            price: 110000,
            img: "/img/adidaspredator.jpg",
            description: "Control total y precisión en cada pase."
        },
        {
            id: 3,
            name: "Puma Future",
            price: 100000,
            img: "/img/pumafuture.jpg",
            description: "Comodidad y ajuste perfecto."
        }
    ];

    const product = products.find(p => p.id == req.params.id);

    res.render("pages/product", { product });
});


// ➕ AGREGAR AL CARRITO
app.get("/add-to-cart/:id", (req, res) => {

    const products = [
        { id: 1, name: "Nike Mercurial", price: 120000, img: "/img/nikemercurial.jpg" },
        { id: 2, name: "Adidas Predator", price: 110000, img: "/img/adidaspredator.jpg" },
        { id: 3, name: "Puma Future", price: 100000, img: "/img/pumafuture.jpg" }
    ];

    const product = products.find(p => p.id == req.params.id);

    if (product) {
        cart.push(product);
    }

    res.redirect("/cart");
});


// 🛒 VER CARRITO
app.get("/cart", (req, res) => {
    res.render("pages/cart", { cart });
});


// ❌ ELIMINAR DEL CARRITO
app.get("/remove-from-cart/:index", (req, res) => {
    cart.splice(req.params.index, 1);
    res.redirect("/cart");
});


// 🔐 LOGIN
app.get("/login", (req, res) => {
    res.render("pages/login");
});


// 📝 REGISTER
app.get("/register", (req, res) => {
    res.render("pages/register");
});


// 💳 CHECKOUT
app.get("/checkout", (req, res) => {
    res.render("pages/checkout");
});


// 🚀 SERVIDOR
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});