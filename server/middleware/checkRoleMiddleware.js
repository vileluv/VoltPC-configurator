const jwt = require("jsonwebtoken");

function roleHandler(role) {
    return (req, res, next) => {
        if (req.method === "OPTIONS") {
            next();
        }
        try {
            const token = req.headers.authorization.split(" ")[1]; // Bearer, token
            if (!token) {
                return res.status(401).json({ message: "Пользователь не авторизован" });
            }
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            if (decoded.role !== role) {
                return res.status(403).json({ message: "Отказано в доступе" });
            }
            next();
        } catch (e) {
            return res.status(401).json({ message: "Пользователь не авторизован" });
        }
    };
}
module.exports = roleHandler;
