import React, { useContext } from "react";
import styles from "./Item.module.scss";
import { observer } from "mobx-react-lite";
import { Context } from "../../index.js";
import Modal from "../Modal/index.js";
import { getHardwares } from "../../api/configuratorAPI.js";

function Item({ children, itemType, count, require = false, ...props }) {
    const { configurator } = useContext(Context);

    return (
        <div className={styles.root} {...props}>
            <div className={styles.info}>
                <span className={styles.name}>{children}</span>
                {require && <span className={styles.require}></span>}
            </div>
            {Object.keys(configurator[itemType]).length !== 0 && <div className={styles.body}></div>}
            <div className={styles.actions}>
                <Modal
                    btnName="Добавить"
                    propUseEffect={() => {
                        getHardwares(itemType).then(res => configurator.setComponentOnType(itemType, res));
                    }}
                >
                    <div className={styles.modal}>
                        <div className={styles.modal__header}>
                            <h2 className={styles.title}>{children}</h2>
                        </div>
                        <div className={styles.modal__body}></div>
                    </div>
                </Modal>
            </div>
        </div>
    );
}

export default observer(Item);
