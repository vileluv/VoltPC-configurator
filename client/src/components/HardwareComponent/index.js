import React, { useContext, useState } from "react";
import styles from "./HardwareComponent.module.scss";
import { observer } from "mobx-react-lite";
import { Context } from "../../index.js";
import Button from "../common/Button/index.js";

function HardwareComponent({ children, type, values, onButtonClick, ...props }) {
    const { configurator } = useContext(Context);

    return (
        <div className={styles.root} {...props}>
            <img alt={values.name} className={styles.image}></img>
            <div className={styles.description}>{`${values.brand} ${values.name} ${values.model}`}</div>
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
