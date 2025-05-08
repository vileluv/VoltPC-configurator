import React, { useEffect, useRef, useState } from "react";
import styles from "./DeleteHardware.module.scss";
import Select from "../../../../components/common/Select/index.js";
import { ITEMS_LIST } from "../../../../utility/constants.js";
import { createForeign, deleteForeign, deleteHardware } from "../../../../api/adminAPI.js";
import Spinner from "../../../../components/Spinner/index.js";
import Input from "../../../../components/common/Input/index.js";
import Button from "../../../../components/common/Button/index.js";
function DeleteHardware() {
    const [selected, setSelected] = useState("");
    const [value, setValue] = useState(0);
    const [loading, setLoading] = useState(false);
    const isFirstRender = useRef(true);

    return (
        <div className={styles.root}>
            <Spinner isLoading={loading} />
            <h2>Удалить комплектующее</h2>
            <div className={styles.adminpage}>
                <div className={styles.adminheader}>
                    <h3>Выберите тип</h3>
                    <Select
                        value={selected}
                        options={ITEMS_LIST.map(({ name, type }) => {
                            return { name: name, value: type };
                        })}
                        onChange={({ target }) => {
                            setSelected(target.value);
                        }}
                        className={styles.inputcomponent}
                    />
                </div>

                <div className={styles.model}>
                    {selected !== "" && (
                        <div className={styles.wrapper}>
                            <div className={styles.label}>ID</div>
                            <Input
                                className={styles.inputcomponent}
                                onChange={({ target }) => {
                                    setValue(target.value);
                                }}
                            />
                        </div>
                    )}
                </div>
                {selected !== "" && (
                    <Button
                        className={styles.createbtn}
                        danger
                        onClick={() => {
                            setLoading(true);
                            deleteHardware(selected, value)
                                .then(res => {
                                    setSelected("");
                                    setValue(0);
                                })
                                .catch(err => {})
                                .finally(() => {
                                    setLoading(false);
                                });
                        }}
                    >
                        Удалить
                    </Button>
                )}
            </div>
        </div>
    );
}

export default DeleteHardware;
