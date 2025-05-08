import React, { useContext } from "react";
import styles from "./HardwareComponent.module.scss";
import { observer } from "mobx-react-lite";
import { Context } from "../../index.js";
import Button from "../common/Button/index.js";
import multiModuleStyles from "../../utility/multiModuleStyles.js";
import { host } from "../../api/index.js";
import Modal from "../Modal/index.js";
import { Link } from "react-router-dom";

function HardwareComponent({
    children,
    type,
    values,
    onButtonClick,
    className,
    vertical,
    withoutBtn = false,
    ...props
}) {
    const { configurator } = useContext(Context);

    return (
        <div className={multiModuleStyles(styles.root, className, vertical ? styles.vertical : "")} {...props}>
            <img src={`${host.getUri()}${values?.img}`} alt={values.name} className={styles.image}></img>

            <Link to={`${type}/${values.id}`} className={styles.description}>
                {values.fullName}
            </Link>
            <div className={styles.price}>{values.price} ₽</div>
            {!withoutBtn && (
                <div className={styles.btnwrapper}>
                    {configurator.getComponent(type)?.id === values?.id ? (
                        <span className={styles.current}>Выбрано</span>
                    ) : (
                        <Button onClick={onButtonClick} className={styles.btn}>
                            Добавить
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
}

export default observer(HardwareComponent);
