// 🔐 Mostrar formulario de login
const getLogin = (req, res) => {
    res.render('pages/login', { errors: [] });
};

// 📝 Mostrar formulario de registro
const getRegister = (req, res) => {
    res.render('pages/register', { errors: [] });
};

// ✅ Procesar registro con validaciones
const postRegister = (req, res) => {
    const { nombre, apellido, email, password } = req.body;
    const errors = [];

    const SITE_NAME = 'botines store';
    const FORBIDDEN = ['password', '1234', 'qwerty', SITE_NAME];

    // 1. Campos no vacíos
    if (!nombre || !apellido || !email || !password) {
        errors.push('Todos los campos son obligatorios.');
    }

    // 2. Sin espacios al principio o al final
    if (
        nombre !== nombre.trim() ||
        apellido !== apellido.trim() ||
        email !== email.trim() ||
        password !== password.trim()
    ) {
        errors.push('Los campos no deben tener espacios al inicio o al final.');
    }

    // 3. Email válido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errors.push('El email no es válido.');
    }

    // 4. Contraseña: mínimo 8 caracteres
    if (password.length < 8) {
        errors.push('La contraseña debe tener al menos 8 caracteres.');
    }

    // 5. Contraseña: al menos una letra
    if (!/[a-zA-Z]/.test(password)) {
        errors.push('La contraseña debe incluir al menos una letra.');
    }

    // 6. Contraseña: al menos un número
    if (!/[0-9]/.test(password)) {
        errors.push('La contraseña debe incluir al menos un número.');
    }

    // 7. Contraseña: al menos un carácter especial
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        errors.push('La contraseña debe incluir al menos un carácter especial (!@#$%^&*...).');
    }

    // 8. Contraseña no contiene cadenas prohibidas
    const passwordLower = password.toLowerCase();
    const nombreLower = nombre ? nombre.toLowerCase() : '';
    const allForbidden = [...FORBIDDEN, nombreLower];

    for (const forbidden of allForbidden) {
        if (passwordLower.includes(forbidden)) {
            errors.push(`La contraseña no puede contener "${forbidden}".`);
            break;
        }
    }

    // 9. Contraseña no igual al email
    if (password === email) {
        errors.push('La contraseña no puede ser igual al email.');
    }

    // Si hay errores, volver al formulario mostrándolos
    if (errors.length > 0) {
        return res.render('pages/register', { errors });
    }

    // ✅ Todo ok — por ahora redirigimos al login
    res.redirect('/login');
};

module.exports = { getLogin, getRegister, postRegister };