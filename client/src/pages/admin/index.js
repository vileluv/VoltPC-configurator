import React from "react";
import styles from "./AdminPage.module.scss";
import { Link, Outlet } from "react-router-dom";
import {
    CREATE_FOREIGN_ROUTE,
    CREATE_HARDWARE_ROUTE,
    DELETE_FOREIGN_ROUTE,
    DELETE_HARDWARE_ROUTE,
} from "../../utility/constants.js";

function AdminPage() {
    return (
        <div className={styles.root}>
            <h1>Админ-Панель</h1>
            <div className={styles.adminpage}>
                <div className={styles.gridcontainer}>
                    <Link to={CREATE_HARDWARE_ROUTE} className={styles.griditem}>
                        Создать комплектующее
                    </Link>

                    <Link to={DELETE_HARDWARE_ROUTE} className={styles.griditem}>
                        Удалить комплектующее
                    </Link>

                    <Link to={CREATE_FOREIGN_ROUTE} className={styles.griditem}>
                        Создать элемент связи
                    </Link>

                    <Link to={DELETE_FOREIGN_ROUTE} className={styles.griditem}>
                        Удалить элемент связи
                    </Link>
                </div>
                <Outlet />
            </div>
        </div>
    );
}

export default AdminPage;
