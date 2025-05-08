import React from "react";
import styles from "./About.module.scss";

function AboutPage() {
    return (
        <div className={styles.root}>
            <h1>О конфигураторе</h1>
            <div className={styles.page}><div className={styles.aboutContainer}>
                <div className={styles.aboutItem}>
                    <h2 className={styles.subTitle}>Что такое конфигуратор?</h2>
                    <p className={styles.text}>
                        Наш конфигуратор ПК — это удобный онлайн-инструмент, который помогает вам легко собрать компьютер, идеально подходящий под ваши нужды. Выберите компоненты, такие как процессор, видеокарта, память и другие детали, и наш конфигуратор автоматически проверит их совместимость.
                    </p>
                </div>
                <div className={styles.aboutItem}>
                    <h2 className={styles.subTitle}>Преимущества использования</h2>
                    <p className={styles.text}>
                        Конфигуратор позволяет:
                        <ul>
                            <li>Подобрать компоненты для разных целей: работы, игр или творчества.</li>
                            <li>Автоматически проверять совместимость компонентов.</li>
                            <li>Выбрать из широкого ассортимента комплектующих от ведущих производителей.</li>
                        </ul>
                    </p>
                </div>
                <div className={styles.aboutItem}>
                    <h2 className={styles.subTitle}>Как это работает?</h2>
                    <p className={styles.text}>
                        Просто выберите нужные компоненты, и конфигуратор покажет вам подходящие варианты, которые можно добавить в корзину. Вся информация о совместимости будет доступна в реальном времени.
                    </p>
                </div>
            </div></div>
        </div>
    );
}

export default AboutPage;
