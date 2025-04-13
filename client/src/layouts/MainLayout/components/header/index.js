import React from "react";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";

function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.header__inner}>
                <h1 className={styles.logo}>Ironbook</h1>
                <nav className={styles.nav}>
                    <Link to="/">Конфигуратор</Link>
                    <Link to="/">Конфигуратор</Link>
                    <Link to="/">Конфигуратор</Link>
                </nav>
                <div className={styles.auth}>
                    <button>Авторизация</button>
                </div>
            </div>
        </header>
    );
}

export default Header;
