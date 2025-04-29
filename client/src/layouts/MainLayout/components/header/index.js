import React, { useContext } from "react";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import { Context } from "../../../../index.js";
import { observer } from "mobx-react-lite";
import { saveCodeConf } from "../../../../api/userAPI.js";

function Header() {
    const { user, configurator } = useContext(Context);

    return (
        <header className={styles.header}>
            <div className={styles.header__inner}>
                <h1 className={styles.logo}>Конфигуратор</h1>
                <nav className={styles.nav}>
                    <Link to="/">Конфигуратор</Link>
                    <Link to="/">Конфигуратор</Link>
                    <Link to="/">Конфигуратор</Link>
                </nav>
                {user.isAuth ? (
                    <div className={styles.profile}>
                        <div className={styles.login}>{user.user?.login}</div>
                        <div className={styles.wrapper}>
                            <div className={styles.options}>
                                {user.user?.role === "ADMIN" && (
                                    <Link to="/admin" className={styles.option} onClick={() => {}}>
                                        Админ-панель
                                    </Link>
                                )}

                                <div
                                    className={styles.option}
                                    onClick={() => {
                                        saveCodeConf(user.user?.id, configurator.confCode)
                                            .then(res => {
                                                user.setUser({ ...user.user, confcode: res });
                                            })
                                            .catch(err => {
                                                //TODO
                                            });
                                    }}
                                >
                                    Сохранить конфигурацию
                                </div>
                                <div
                                    className={styles.option}
                                    onClick={() => {
                                        localStorage.removeItem("token");
                                        user.setUser({});
                                        user.setIsAuth(false);
                                    }}
                                >
                                    Выйти
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <Link to="/login">
                        <div className={styles.auth}>Авторизация</div>
                    </Link>
                )}
            </div>
        </header>
    );
}

export default observer(Header);
