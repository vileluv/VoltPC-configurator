import React, { useContext, useState } from "react";
import styles from "./HardwareComponent.module.scss";
import { observer } from "mobx-react-lite";
import { Context } from "../../index.js";

function HardwareComponent({ children, ...props }) {
    const { configurator } = useContext(Context);

    return <div className={styles.root} {...props}></div>;
}

export default observer(HardwareComponent);
