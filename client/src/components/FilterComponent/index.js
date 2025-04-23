import React, { useRef, useState } from "react";
import styles from "./FilterComponent.module.scss";
import multiModuleStyles from "../../utility/multiModuleStyles.js";
import Checkbox from "../common/Checkbox/index.js";
import Input from "../common/Input/index.js";
import { observer } from "mobx-react-lite";
import { FILTER_TYPES } from "../../utility/constants.js";

function FilterComponent({ title = "", type = "", interval = { min: null, max: null }, selector = [] }) {
    const hideRef = useRef(null);
    const [hide, setHide] = useState(false);
    const [selected, setSelected] = useState([]);

    const toggleCheckbox = option => {
        setSelected(prev => (prev.includes(option) ? prev.filter(o => o !== option) : [...prev, option]));
    };
    const switchType = () => {
        switch (type) {
            case FILTER_TYPES.interval: {
                if (interval.min === null) return <></>;
                return (
                    <div className={styles.interval}>
                        <Input placeholder={interval.min} type="number"></Input>
                        <Input placeholder={interval.max} type="number"></Input>
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
                console.error("Unallowed filter type: " + type);
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
