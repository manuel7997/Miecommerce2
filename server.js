const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();
 
// ⚙️ Configuración del motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
 
// 📁 Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
 
// 🔐 Configuración de sesión
app.use(session({
    secret: 'botines-store-secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // false porque no usamos HTTPS en desarrollo
}));
 
// 🧩 Middlewares para leer formularios
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
 
// 📋 Middleware logger (registra cada petición)
app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
    next();
});
 
// 🛣️ Rutas
app.use('/', require('./routes/productRoute'));
app.use('/', require('./routes/cartRoute'));
app.use('/', require('./routes/authRoute'));
app.use('/', require('./routes/categoryRoute'));
 
// 💳 Checkout
app.get('/checkout', (req, res) => {
    res.render('pages/checkout');
});
 
// ❌ 404 — debe ir AL FINAL, después de todas las rutas
app.use((req, res) => {
    res.status(404).render('pages/404');
});
 
// 🚀 Servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
 