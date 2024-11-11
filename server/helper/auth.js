import jwt from 'jsonwebtoken';
const { verify } = jwt;
const authorizationRequired = "Authorization required";
const invalidCrendentials = "Invalid credentials";

const auth = (req, res, next) => {
    if (!req.headers.authorization) {
        res.statusMessage = authorizationRequired;
        return res.status(401).json({message: authorizationRequired});
    } else {
        try {
            const token = req.headers.authorization;
            verify(token, process.env.JWT_SECRET_KEY);
            next();
        } catch (error) {
            res.statusMessage = invalidCrendentials;
            return res.status(403).json({message: invalidCrendentials});
        }
    }
}

export { auth };