import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./FilterComponent.module.scss";
import multiModuleStyles from "../../utility/multiModuleStyles.js";
import Checkbox from "../common/Checkbox/index.js";
import Input from "../common/Input/index.js";
import { observer } from "mobx-react-lite";
import { FILTER_TYPES } from "../../utility/constants.js";
import { Context } from "../../index.js";

function FilterComponent({ type, title = "", filterType = "", interval = { min: null, max: null }, selector = [] }) {
    const hideRef = useRef(null);
    const { filter } = useContext(Context);
    const [hide, setHide] = useState(false);
    const [selected, setSelected] = useState([]);
    const [intervalData, setIntervalData] = useState(interval);
    const isFirstRender = useRef(true);
    const checkFilters = filter.filters;
    useEffect(() => {
        if (isFirstRender.current) {
            return;
        }

        let currentInterval;
        if (intervalData.min > intervalData.max) {
            currentInterval = { min: Number(intervalData.max), max: Number(intervalData.min) };
        } else currentInterval = { min: Number(intervalData.min), max: Number(intervalData.max) };

        filter.addFilters(type, currentInterval);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [intervalData.min, intervalData.max]);
    useEffect(() => {
        if (isFirstRender.current) {
            return;
        }
        if (selected.length === 0) {
            filter.deleteFilter(type);
            return;
        }
        filter.addFilters(type, selected);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selected]);
    useEffect(() => {
        if (Object.keys(checkFilters).length === 0) {
            setIntervalData(interval);
            setSelected([]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checkFilters]);

    useEffect(() => {
        isFirstRender.current = false;
    }, []);

    const handleChange = e => {
        const { name, value } = e.target;
        setIntervalData(prev => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleBlur = () => {
        if (Number(intervalData.min) < interval.min || Number(intervalData.min) > interval.max)
            setIntervalData(prev => ({
                ...prev,
                min: interval.min,
            }));
        if (Number(intervalData.max) > interval.max || Number(intervalData.max) < interval.min)
            setIntervalData(prev => ({
                ...prev,
                max: interval.max,
            }));
    };
    const toggleCheckbox = option => {
        setSelected(prev => (prev.includes(option) ? prev.filter(f => f !== option) : [...prev, option]));
    };
    const switchType = () => {
        switch (filterType) {
            case FILTER_TYPES.interval: {
                if (interval.min === null) return <></>;
                return (
                    <div className={styles.interval}>
                        <Input
                            name="min"
                            value={intervalData.min}
                            onChange={handleChange}
                            type="number"
                            min={intervalData.min}
                            autoComplete="off"
                            onBlur={handleBlur}
                        ></Input>
                        <Input
                            name="max"
                            value={intervalData.max}
                            onChange={handleChange}
                            type="number"
                            max={intervalData.max}
                            autoComplete="off"
                            onBlur={handleBlur}
                        ></Input>
                    </div>
                );
            }
            case FILTER_TYPES.selector: {
                if (selector.length === 0) return <></>;
                return (
                    <div className={styles.selector}>
                        {selector.map(label => (
                            <Checkbox
                                label={label}
                                key={label}
                                checked={selected.includes(label)}
                                onChange={() => {
                                    toggleCheckbox(label);
                                }}
                            />
                        ))}
                    </div>
                );
            }
            default: {
                console.error("Unallowed filter type: " + filterType);
                return <></>;
            }
        }
    };
    const hideFilter = event => {
        const hideClasslist = hideRef.current?.classList;
        if (!hideClasslist) return;
        if (hideClasslist.contains(styles.hide__active)) {
            hideClasslist.remove(styles.hide__active);
            setHide(false);
        } else {
            hideClasslist.add(styles.hide__active);
            setHide(true);
        }
    };
    return (
        <div className={styles.root}>
            <div className={styles.header} onClick={hideFilter}>
                <div className={styles.title}>{title}</div>
                <div className={styles.hide} ref={hideRef}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 20" fill="none">
                        <path
                            d="M18.2929 15.2893C18.6834 14.8988 18.6834 14.2656 18.2929 13.8751L13.4007 8.98766C12.6195 8.20726 11.3537 8.20757 10.5729 8.98835L5.68257 13.8787C5.29205 14.2692 5.29205 14.9024 5.68257 15.2929C6.0731 15.6835 6.70626 15.6835 7.09679 15.2929L11.2824 11.1073C11.673 10.7168 12.3061 10.7168 12.6966 11.1073L16.8787 15.2893C17.2692 15.6798 17.9024 15.6798 18.2929 15.2893Z"
                            fill="#0F0F0F"
                        />
                    </svg>
                </div>
            </div>
            <div className={multiModuleStyles(styles.body, hide ? styles.body__hide : "")}>{switchType()}</div>
        </div>
    );
}

export default observer(FilterComponent);
