const ApiError = require("../utility/apiError.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/index.js");

function jwtGenerate(id, mail, role) {
    return jwt.sign({ id, mail, role }, process.env.JWT_SECRET, { expiresIn: "24h" });
}

class userController {
    async registration(req, res, next) {
        const { login, password, role } = req.body;
        if (!login || !password) {
            return next(ApiError.badRequest("Некорректный логин или пароль"));
        }
        const candidate = await User.findOne({ where: { login } });
        if (candidate) {
            return next(ApiError.badRequest("Пользователь с таким именем уже существует"));
        }
        const hashPass = await bcrypt.hash(password, 5);
        const user = await User.create({ login, role, password: hashPass });
        const token = jwtGenerate(user.id, user.login, user.role);
        return res.json({ token: token });
    }
    async login(req, res, next) {
        const { login, password } = req.body;
        const user = await User.findOne({ where: { login } });
        if (!user) {
            return next(ApiError.badRequest("Пользователь не найден"));
        }
        let comparePass = bcrypt.compareSync(password, user.password);
        if (!comparePass) {
            return next(ApiError.badRequest("Неверный пароль"));
        }
        const token = jwtGenerate(user.id, user.login, user.role);
        return res.json({ token: token });
    }
    async auth(req, res, next) {
        const token = jwtGenerate(req.user.id, req.user.login, req.user.role);
        return res.json({ token: token });
    }
}
module.exports = new userController();
