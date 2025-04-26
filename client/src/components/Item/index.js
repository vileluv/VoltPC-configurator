import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./Item.module.scss";
import { observer } from "mobx-react-lite";
import { Context } from "../../index.js";
import Modal from "../Modal/index.js";
import { getHardwaresWithFilters } from "../../api/configuratorAPI.js";
import HardwareComponent from "../HardwareComponent/index.js";
import FilterComponent from "../FilterComponent/index.js";
import { getFilters } from "../../api/filterAPI.js";
import Button from "../common/Button/index.js";
import Spinner from "../Spinner/index.js";
import multiModuleStyles from "../../utility/multiModuleStyles.js";
import Input from "../common/Input/index.js";
import validateNumber from "../../utility/validateNumber.js";

function Item({ children, itemName, itemType, count, require = false, ...props }) {
    const { filter, configurator } = useContext(Context);
    const [hardwareArray, setHardwareArray] = useState([]);
    const [filters, setFilters] = useState({});
    const [loading, setLoading] = useState(false);
    const [hardwareLoading, setHardwareLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const [page, setPage] = useState(1);
    const scrollRef = useRef(null);
    const firstRender = useRef(true);
    const { id, fullName } = configurator.getComponent(itemType);

    const scrollToTop = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = 0;
        }
    };
    function getModalInfoRequests() {
        setLoading(true);
        Promise.all([getFilters(itemType), getHardwaresWithFilters(itemType, {}, 1, 10)])
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
    function getHardwareWithFiltersRequest(sortArguments, page = 1, limit = 10) {
        setHardwareLoading(true);
        getHardwaresWithFilters(itemType, filter.filters, page, limit, sortArguments)
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
    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }
        const timer = setTimeout(() => {
            getHardwareWithFiltersRequest({}, validateNumber(page), 10);
        }, 500);
        return () => clearTimeout(timer);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    return (
        <div className={styles.root} {...props}>
            <div className={styles.info}>
                <span className={styles.name}>{itemName}</span>
                {require && <span className={styles.require}></span>}
            </div>
            {id !== undefined && <div className={styles.body}>{fullName}</div>}
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
                                            interval={filterInfo.values}
                                            selector={filterInfo.values}
                                        />
                                    );
                                })}

                                <Button
                                    onClick={() => {
                                        getHardwareWithFiltersRequest();
                                    }}
                                    disabled={hardwareLoading}
                                >
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
                            <div className={styles.wrapper}>
                                <div className={styles.options}>
                                    <div className={styles.sorting}>
                                        <span className={styles.sorttitle}>Сортировать по:</span>
                                        <SortItem
                                            customUseEffect={state => {
                                                getHardwareWithFiltersRequest({ price: state });
                                            }}
                                        >
                                            Цене
                                        </SortItem>
                                    </div>
                                    <div className={styles.flipping}>
                                        <Button
                                            className={styles.back}
                                            danger
                                            disableBefore
                                            onClick={() => {
                                                setPage(validateNumber(page - 1));
                                            }}
                                        >
                                            &#9668;
                                        </Button>
                                        <Input
                                            className={styles.setpage}
                                            type="number"
                                            value={page}
                                            onChange={({ target }) => {
                                                setPage(validateNumber(target.value));
                                            }}
                                            maxLength={3}
                                        />
                                        <Button
                                            className={styles.forward}
                                            disableBefore
                                            onClick={() => {
                                                setPage(validateNumber(page + 1));
                                            }}
                                        >
                                            &#9658;
                                        </Button>
                                    </div>
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
                    </div>
                </Modal>
            </div>
        </div>
    );
}

function SortItem({ children, sortArgument, customUseEffect = () => {}, onClick = () => {}, ...props }) {
    //TODO CHANGE STATE ON REQUEST
    const [stateCount, setStateCount] = useState(0);
    const firstRender = useRef(true);
    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }
        customUseEffect(stateCount);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stateCount]);

    function toggleSort() {
        if (stateCount === 2) {
            setStateCount(0);
            return;
        }
        setStateCount(stateCount + 1);
    }
    return (
        <span
            className={styles.sortitem}
            onClick={() => {
                toggleSort();
                onClick();
            }}
            {...props}
        >
            <span>{children}</span>
            <svg
                className={multiModuleStyles(
                    styles.arrow,
                    stateCount > 0 ? styles.arrow__visible : "",
                    stateCount > 1 ? styles.arrow__reversed : ""
                )}
                width="18px"
                height="18px"
                viewBox="-2.4 -2.4 28.80 28.80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M12 4V20M12 20L8 16M12 20L16 16"
                    stroke="#000000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                ></path>
            </svg>
        </span>
    );
}

export default observer(Item);
