import React from "react";
import styles from "./Button.module.scss";
import multiModuleStyles from "../../../utility/multiModuleStyles.js";
function Button({ children, onClick = () => {}, danger, className, disabled, ...props }) {
    return (
        <button
            onClick={() => {
                onClick();
            }}
            className={multiModuleStyles(styles.root, danger ? styles.danger : "", className)}
            disabled={disabled}
            {...props}
        >
            <span>{children}</span>
        </button>
    );
}

export default Button;
