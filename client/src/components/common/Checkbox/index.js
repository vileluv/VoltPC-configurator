import React from "react";
import styles from "./Checkbox.module.scss";
function Checkbox({ label, forId, checked, onChange, ...props }) {
    return (
        <label htmlFor={forId} className={styles.root}>
            <input id={forId} type="checkbox" className={styles.checkbox} checked={checked} onChange={onChange} />
            <span className={styles.checkbox__custom}>
                <svg width="12px" height="11px" viewBox="0 0 12 11">
                    <polyline points="1 6.29411765 4.5 10 11 1"></polyline>
                </svg>
            </span>

            {label && <span>{label}</span>}
        </label>
    );
}

export default Checkbox;
