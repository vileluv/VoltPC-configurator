import React from "react";
import styles from "./MainPage.module.scss";
import Configurator from "../../components/Configurator/index.js";
function MainPage() {
    return (
        <div className={styles.root}>
            <h1>Конфигуратор ПК</h1>
            <Configurator />
        </div>
    );
}

export default MainPage;
