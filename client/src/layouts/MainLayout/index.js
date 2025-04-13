import React from "react";
import styles from "./MainLayout.module.scss";
import Header from "./components/header/index.js";
import Footer from "./components/footer/index.js";

function MainLayout({ children }) {
    return (
        <div className={styles.root}>
            <Header />
            <main className={styles.main}>{children}</main>
            <Footer />
        </div>
    );
}

export default MainLayout;
