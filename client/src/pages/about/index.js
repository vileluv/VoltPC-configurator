import React from "react";
import styles from "./About.module.scss";

function AboutPage() {
    return (
        <div className={styles.root}>
            <h1>О конфигураторе</h1>
            <div className={styles.page}></div>
        </div>
    );
}

export default AboutPage;
