import React from "react";
import styles from "./Footer.module.scss";

// import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.credits}>
                <div className={styles.credits__inner}>
                    <div className={styles.credits__inner__left}>
                        <h3>Создатель сайта</h3>
                        <span>Ученик финансового университета:</span>
                        <span>Колупов Сергей Андреевич</span>
                    </div>
                    <div className={styles.credits__inner__right}>
                        <h3>Контакты</h3>
                        <span>Москва, Финансовый университет</span>
                        <span>s.kolupov@icloud.com</span>
                        <span>+7 (985) 914-18-55</span>
                    </div>
                </div>
            </div>
            <div className={styles.authority}>
                <div className={styles.authority__inner}>
                    <span>&copy; 2025 Авторское право:</span>
                    <span>Колупов</span>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
