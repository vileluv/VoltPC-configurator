const ApiError = require("../utility/apiError.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/index.js");

function jwtGenerate(id, login, role) {
    return jwt.sign({ id, login, role }, process.env.JWT_SECRET, { expiresIn: "24h" });
}

class userController {
    async registration(req, res, next) {
        const { login, password, role } = req.body;
        if (!login || !password) {
            return next(ApiError.badRequest("Некорректный логин или пароль"));
        }
        if (login.length > 50 || login.length < 5 || password.length < 5 || password.length > 50) {
            return next(ApiError.badRequest("Неверная длина логина или пароля"));
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
        if (!login || !password) {
            return next(ApiError.badRequest("Некорректный логин или пароль"));
        }
        const user = await User.findOne({ where: { login } });
        if (!user) {
            return next(ApiError.badRequest("Пользователь не найден"));
        }
        let comparePass = bcrypt.compareSync(password, user.password);
        if (!comparePass) {
            return next(ApiError.badRequest("Неверный пароль"));
        }
        const token = jwtGenerate(user.id, user.login, user.role);
        return res.json({ token: token, info: { confcode: user.confcode } });
    }
    async auth(req, res, next) {
        const user = await User.findOne({ where: { id: req.user.id } });
        const token = jwtGenerate(req.user.id, req.user.login, req.user.role);
        return res.json({ token: token, info: { confcode: user.confcode } });
    }
    async saveCodeConf(req, res, next) {
        const { confcode, id } = req.body;
        if (typeof confcode !== "string") return next(ApiError.badRequest("Неверный код конфигурации"));
        await User.update({ confcode: confcode }, { where: { id: id } });

        return res.send(confcode);
    }
}
module.exports = new userController();
