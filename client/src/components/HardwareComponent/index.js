import React, { useContext } from "react";
import styles from "./HardwareComponent.module.scss";
import { observer } from "mobx-react-lite";
import { Context } from "../../index.js";
import Button from "../common/Button/index.js";
import multiModuleStyles from "../../utility/multiModuleStyles.js";
import { host } from "../../api/index.js";

function HardwareComponent({ children, type, values, onButtonClick, className, vertical, ...props }) {
    const { configurator } = useContext(Context);

    return (
        <div className={multiModuleStyles(styles.root, className, vertical ? styles.vertical : "")} {...props}>
            <img src={`${host.getUri()}${values?.img}`} alt={values.name} className={styles.image}></img>
            <div className={styles.description}>{values.fullName}</div>
            <div className={styles.price}>{values.price} ₽</div>
            <div className={styles.btnwrapper}>
                {configurator.getComponent(type)?.id === values?.id ? (
                    <span className={styles.current}>Выбрано</span>
                ) : (
                    <Button onClick={onButtonClick} className={styles.btn}>
                        Добавить
                    </Button>
                )}
            </div>
        </div>
    );
}

export default observer(HardwareComponent);
