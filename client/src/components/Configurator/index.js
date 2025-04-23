import React, { useState } from "react";
import styles from "./Configurator.module.scss";
import { ITEMS_LIST } from "../../utility/constants.js";
import Item from "../Item/index.js";
import Input from "../common/Input/index.js";
function Configurator() {
    const [confCode, setConfCode] = useState("");
    return (
        <div className={styles.root}>
            <div className={styles.configurator}>
                <div className={styles.configurator__header}>
                    <div className={styles.configurator__header__left}>
                        <h2>Системный блок</h2>
                        <span className={styles.mandatory}>* Обязательные комплектующие</span>
                    </div>
                    <div className={styles.configurator__header__right}>
                        <Input
                            value={confCode}
                            onChange={({ target }) => {
                                setConfCode(target.value);
                            }}
                            placeholder="Код конфигурации"
                        />
                    </div>
                </div>
                <div className={styles.configurator__body}>
                    {ITEMS_LIST.map(({ type, name, require }) => (
                        <Item key={type} itemName={name} itemType={type} require={require} />
                    ))}
                </div>
            </div>
            <aside className={styles.aside}></aside>
        </div>
    );
}

export default Configurator;
