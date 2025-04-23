import React from "react";
import styles from "./Button.module.scss";
function Button({ children, onClick, ...props }) {
    return (
        <button
            onClick={() => {
                onClick();
            }}
            className={styles.root}
            {...props}
        >
            {children}
        </button>
    );
}

export default Button;
