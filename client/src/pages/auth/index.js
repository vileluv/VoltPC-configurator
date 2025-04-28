import React, { useContext, useEffect, useState } from "react";
import styles from "./AuthPage.module.scss";
import Input from "../../components/common/Input/index.js";
import Button from "../../components/common/Button/index.js";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE } from "../../utility/constants.js";
import { login, registration } from "../../api/userAPI.js";
import { Context } from "../../index.js";
import { observer } from "mobx-react-lite";
function AuthPage() {
    const [loginValue, setLoginValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useContext(Context);
    const isLogin = location?.pathname === LOGIN_ROUTE;
    useEffect(() => {
        setLoginValue("");
        setPasswordValue("");
    }, [isLogin]);

    const authHandler = async () => {
        try {
            if (loginValue.length === 0 || passwordValue.length === 0) return;
            let data;
            if (isLogin) {
                data = await login(loginValue, passwordValue);
            } else {
                data = await registration(loginValue, passwordValue);
            }
            user.setUser(data);
            user.setIsAuth(true);
            navigate(MAIN_ROUTE);
        } catch (err) {
            //TODO
        }
    };
    return (
        <div className={styles.root}>
            <div className={styles.authwrapper}>
                <h1>{isLogin ? "Авторизация" : "Регистрация"}</h1>
                <Input
                    className={styles.input}
                    placeholder="Введите логин"
                    type="text"
                    autoComplete="off"
                    value={loginValue}
                    onChange={({ target }) => {
                        setLoginValue(target.value);
                    }}
                    readOnly={!isLogin}
                    onFocus={({ target }) => {
                        target.removeAttribute("readonly");
                    }}
                />
                <Input
                    className={styles.input}
                    placeholder="Введите пароль"
                    type="password"
                    autoComplete={isLogin ? "off" : "new-password"}
                    aria-autocomplete="inline"
                    value={passwordValue}
                    onChange={({ target }) => {
                        setPasswordValue(target.value);
                    }}
                    readOnly={!isLogin}
                    onFocus={({ target }) => {
                        target.removeAttribute("readonly");
                    }}
                />

                <Button className={styles.btn} onClick={authHandler}>
                    {isLogin ? "Войти" : "Зарегистрироваться"}
                </Button>

                <div className={styles.infotext}>
                    {isLogin ? (
                        <Link to={REGISTRATION_ROUTE}> Нет аккаунта? Зарегистрируйтесь!</Link>
                    ) : (
                        <Link to={LOGIN_ROUTE}>Уже есть аккаунт? Авторизируйтесь!</Link>
                    )}
                </div>
            </div>
        </div>
    );
}

export default observer(AuthPage);
