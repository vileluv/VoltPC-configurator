import React, { useContext, useRef, useState } from "react";
import styles from "./Item.module.scss";
import { observer } from "mobx-react-lite";
import { Context } from "../../index.js";
import Modal from "../Modal/index.js";
import { getHardwares, getHardwaresWithFilters } from "../../api/configuratorAPI.js";
import HardwareComponent from "../HardwareComponent/index.js";
import FilterComponent from "../FilterComponent/index.js";
import { FILTER_TYPES } from "../../utility/constants.js";
import { getFilters } from "../../api/filterAPI.js";
import Button from "../common/Button/index.js";
import Spinner from "../Spinner/index.js";

function Item({ children, itemName, itemType, count, require = false, ...props }) {
    const { filter, configurator } = useContext(Context);
    const [hardwareArray, setHardwareArray] = useState([]);
    const [filters, setFilters] = useState({});
    const [loading, setLoading] = useState(false);
    const [hardwareLoading, setHardwareLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const scrollRef = useRef(null);
    const { id, brand, name, model } = configurator.getComponent(itemType);

    const scrollToTop = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = 0;
        }
    };
    function getModalInfoRequests() {
        setLoading(true);
        Promise.all([getFilters(itemType), getHardwares(itemType, undefined, undefined)])
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
    function getHardwareWithFiltersRequest() {
        setHardwareLoading(true);
        getHardwaresWithFilters(itemType, filter.filters, undefined, undefined)
            .then(res => {
                setHardwareArray(res?.rows || []);
            })
            .catch(() => {
                //TODO
            })
            .finally(() => {
                scrollToTop();
                setHardwareLoading(false);
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
                <Spinner isLoading={hardwareLoading} />
                {id !== undefined && (
                    <Button
                        className={styles.deletebtn}
                        danger
                        onClick={() => {
                            configurator.setComponent(itemType, {});
                        }}
                    >
                        Удалить
                    </Button>
                )}
                <Modal
                    btnName={id === undefined ? "Добавить" : "Сменить"}
                    loading={loading}
                    propsOnClick={() => {
                        filter.setFilters({});
                        getModalInfoRequests();
                        setModal(true);
                    }}
                    customModalValue={modal}
                    contentRef={scrollRef}
                >
                    <div className={styles.modal}>
                        <div className={styles.modal__header}>
                            <h2 className={styles.title}>{itemName}</h2>
                        </div>
                        <div className={styles.modal__body}>
                            <div className={styles.filters}>
                                {Object.keys(filters).map(element => {
                                    const filterInfo = filters[element];
                                    if (filterInfo.values === undefined) return null;
                                    return (
                                        <FilterComponent
                                            key={element}
                                            type={element}
                                            title={filterInfo.title}
                                            filterType={filterInfo.type}
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

                                <Button onClick={getHardwareWithFiltersRequest} disabled={hardwareLoading}>
                                    Применить
                                </Button>
                                <Button
                                    onClick={() => {
                                        filter.setFilters({});
                                        getHardwareWithFiltersRequest();
                                    }}
                                    danger={true}
                                >
                                    Сбросить
                                </Button>
                            </div>
                            <div className={styles.hardwares}>
                                {hardwareArray
                                    .sort(e => (e?.id === id ? -1 : 1))
                                    .map((e, i) => (
                                        <HardwareComponent
                                            type={itemType}
                                            values={e}
                                            key={i}
                                            onButtonClick={() => {
                                                setModal(false);
                                                configurator.setComponent(itemType, e);
                                            }}
                                        />
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
