import React from "react";
import styles from "./Select.module.scss";
import multiModuleStyles from "../../../utility/multiModuleStyles.js";
function Select({ value, className, onChange = () => {}, options = [], ...props }) {
    return (
        <select
            defaultValue={""}
            className={multiModuleStyles(styles.root, className)}
            onChange={onChange}
            value={value}
            {...props}
        >
            {options.map(({ name, value }, i) => (
                <option value={value} key={name + i}>
                    {name}
                </option>
            ))}
            <option value="">Пусто</option>
        </select>
    );
}

export default Select;
