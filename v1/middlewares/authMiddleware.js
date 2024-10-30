const jwt = require('jsonwebtoken');
const JWT_SECRET = 'SunuEmoAutiste'; 

// Middleware pour vérifier le token JWT
function authMiddleware(req, res, next) {
    // Récupérer le token de l'en-tête
    const token = req.header('Authorization')?.split(' ')[1]; // Format typique: "Bearer TOKEN"

    // Vérifier la présence du token
    if (!token) {
        return res.status(401).json({
            status: 'error',
            message: 'No token, authorization denied',
            data: {}
        });
    }

    // Vérifier le token
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; 
        next(); 
    } catch (err) {
        res.status(401).json({
            status: 'error',
            message: 'Token is not valid',
            data: {}
        });
    }
}

module.exports = authMiddleware;
