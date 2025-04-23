import React from "react";
import styles from "./Input.module.scss";
function Input({ value, placeholder, onChange, ...props }) {
    return <input className={styles.root} value={value} onChange={onChange} placeholder={placeholder} {...props} />;
}

export default Input;
