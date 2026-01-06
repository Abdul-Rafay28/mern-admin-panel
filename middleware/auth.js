import jwt from 'jsonwebtoken';

function verifyToken(req, resp, next) {
    const token = req.cookies.token;
    if (!token) {
        return resp.status(401).json({
            message: 'No token provided!',
            success: false,
        })
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return resp.status(401).json({
                message: 'Invalid token or expired token!',
                success: false,
            })
        }
        req.user = decoded;
        next();
    })
}

export default verifyToken;