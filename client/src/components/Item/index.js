import React, { useContext, useState } from "react";
import styles from "./Item.module.scss";
import { observer } from "mobx-react-lite";
import { Context } from "../../index.js";
import Modal from "../Modal/index.js";
import { getHardwares } from "../../api/configuratorAPI.js";
import HardwareComponent from "../HardwareComponent/index.js";
import FilterComponent from "../FilterComponent/index.js";
import { FILTER_TYPES } from "../../utility/constants.js";
import { getFilters } from "../../api/filterAPI.js";

function Item({ children, itemName, itemType, count, require = false, ...props }) {
    const { configurator } = useContext(Context);
    const [hardwareArray, setHardwareArray] = useState([]);
    const [filters, setFilters] = useState({});
    const [loading, setLoading] = useState(false);
    const { id, brand, name, model } = configurator.getComponent(itemType);
    function getHardwareRequest() {
        setLoading(true);
        Promise.all([
            getFilters(itemType),
            getHardwares(itemType, { price: 20000, asdad: "dsadasd" }, undefined, undefined),
        ])
            .then(values => {
                setFilters(values[0]);
                setHardwareArray(values[1]?.rows || []);
            })
            .catch(() => {
                //TODO
            })
            .finally(() => {
                setLoading(false);
            });
    }
    return (
        <div className={styles.root} {...props}>
            <div className={styles.info}>
                <span className={styles.name}>{itemName}</span>
                {require && <span className={styles.require}></span>}
            </div>
            {id !== undefined && <div className={styles.body}>{`${brand} ${name} ${model}`}</div>}
            <div className={styles.actions}>
                <Modal
                    btnName="Добавить"
                    loading={loading}
                    propsOnClick={() => {
                        getHardwareRequest();
                    }}
                >
                    <div className={styles.modal}>
                        <div className={styles.modal__header}>
                            <h2 className={styles.title}>{itemName}</h2>
                        </div>
                        <div className={styles.modal__body}>
                            <div className={styles.filters}>
                                <div className={styles.filters__title}></div>
                                <div className={styles.filters__body}>
                                    {Object.keys(filters).map(element => {
                                        const filterInfo = filters[element];
                                        if (filterInfo.values === undefined) return <></>;
                                        return (
                                            <FilterComponent
                                                title={filterInfo.title}
                                                type={filterInfo.type}
                                                interval={
                                                    filterInfo.type === FILTER_TYPES.interval
                                                        ? filterInfo.values
                                                        : undefined
                                                }
                                                selector={
                                                    filterInfo.type === FILTER_TYPES.selector
                                                        ? filterInfo.values
                                                        : undefined
                                                }
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                            <div className={styles.hardwares}>
                                {hardwareArray.map((e, i) => (
                                    <HardwareComponent key={i} />
                                ))}
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    );
}

export default observer(Item);
