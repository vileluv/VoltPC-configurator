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
import { FILTER_TYPES } from "../../utility/constants.js";
import { Link } from "react-router-dom";

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
    const [sortArg, setSortArg] = useState({});
    const scrollToTop = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = 0;
        }
    };
    function addPreFilters(reqFilters) {
        Object.keys(reqFilters)
            .filter(f => reqFilters[f]?.values !== undefined)
            .forEach(element => {
                Object.entries(reqFilters[element]?.relations || []).forEach(entry => {
                    const componentValue = configurator.getComponent(entry[0])?.[entry[1]];
                    if (componentValue === undefined) return;
                    if (filter.filters[element] === undefined) {
                        switch (reqFilters[element]?.type) {
                            case FILTER_TYPES.interval: {
                                const intervalValue = { min: componentValue, max: reqFilters[element]?.values?.max };
                                if (componentValue > reqFilters[element]?.values?.max) {
                                    intervalValue.max = intervalValue.min;
                                    intervalValue.min = reqFilters[element]?.values?.min;
                                }
                                filter.addFilters(element, intervalValue);
                                break;
                            }

                            case FILTER_TYPES.selector: {
                                filter.addFilters(element, [componentValue].flat());
                                break;
                            }
                            case FILTER_TYPES.selectorWithForeign:
                            case FILTER_TYPES.selectorWithManyForeign: {
                                filter.addFilters(
                                    element,
                                    [componentValue].flat().map(val => val.name)
                                );
                                break;
                            }
                            default: {
                                console.error("Unallowed filter type: " + reqFilters[element]?.type);
                            }
                        }
                    }
                });
            });
    }
    async function getModalInfoRequests() {
        setLoading(true);
        const reqFilters = await getFilters(itemType).catch(err => {
            return [];
        });
        setFilters(reqFilters);
        addPreFilters(reqFilters);
        const reqHardwares = await getHardwaresWithFilters(itemType, filter.filters, 1, 10);
        setHardwareArray(reqHardwares?.rows || []);
        setLoading(false);
    }
    function getHardwareWithFiltersRequest() {
        setHardwareLoading(true);
        addPreFilters(filters);
        getHardwaresWithFilters(itemType, filter.filters, page, 10, sortArg)
            .then(res => {
                setHardwareArray(res?.rows || []);
            })
            .catch(() => {})
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
            getHardwareWithFiltersRequest();
        }, 500);
        return () => clearTimeout(timer);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, sortArg]);

    return (
        <div className={styles.root} {...props}>
            <div className={styles.info}>
                <span className={styles.name}>{itemName}</span>
                {require && <span className={styles.require}></span>}
            </div>
            {id !== undefined && (
                <Link to={`${itemType}/${id}`} className={styles.body}>
                    {fullName}
                </Link>
            )}
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
                    propsOnClick={async () => {
                        filter.setFilters({});
                        await getModalInfoRequests();
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
                                {Object.keys(filters)
                                    .filter(f => filters[f]?.values !== undefined)
                                    .map(element => {
                                        const filterInfo = filters[element];
                                        const condition = Object.entries(filters[element]?.relations || [])
                                            .map(entry => {
                                                const componentValue = configurator.getComponent(entry[0])?.[entry[1]];
                                                if (componentValue === undefined) return false;
                                                return true;
                                            })
                                            .includes(true);

                                        return (
                                            <FilterComponent
                                                key={element}
                                                type={element}
                                                title={filterInfo.title}
                                                filterType={filterInfo.type}
                                                interval={filterInfo.values}
                                                selector={filterInfo.values}
                                                preSelected={condition ? filter.filters[element] : []}
                                                preIntervalData={condition ? filter.filters[element] : { min: null }}
                                                disabled={condition}
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
                                                setSortArg({ price: state });
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
                                    {hardwareArray.length > 0 ? (
                                        hardwareArray
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
                                            ))
                                    ) : (
                                        <div className={styles.placeholder}>По заданным фильтрам комплектующих нет</div>
                                    )}
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
