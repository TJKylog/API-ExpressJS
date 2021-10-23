import jwt from 'jsonwebtoken';

const isAuthenticated = (req, res, next) => {
    const token = req.get('Authorization');
    if (!token) {
        return res.status(401).json({
            error: 'No token provided'
        });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                error: 'Token invalid'
            });
        }
        req.user = decoded.data;

        next();
    })
};

const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(401).json({
            error: 'Unauthorized'
        });
    }
    next();
};

module.exports = {isAuthenticated, isAdmin};
