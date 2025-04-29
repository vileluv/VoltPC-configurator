import React, { useEffect, useRef, useState } from "react";
import styles from "./AdminPage.module.scss";
import Select from "../../components/common/Select/index.js";
import { ITEMS_LIST } from "../../utility/constants.js";
import { createHardware, getModel } from "../../api/adminAPI.js";
import Spinner from "../../components/Spinner/index.js";
import Input from "../../components/common/Input/index.js";
import Button from "../../components/common/Button/index.js";
function AdminPage() {
    const [selected, setSelected] = useState("");
    const [model, setModel] = useState([]);
    const [modelValues, setModelValues] = useState({});
    const [loading, setLoading] = useState(false);
    const isFirstRender = useRef(true);
    async function modelRequest() {
        setLoading(true);
        getModel(selected)
            .then(res => {
                if (!res) return;
                setModel(res);
            })
            .catch(err => {
                //TODO
            })
            .finally(() => {
                setLoading(false);
            });
    }
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        if (!selected) {
            setModel([]);
            return;
        }
        modelRequest();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selected]);

    return (
        <div className={styles.root}>
            <Spinner isLoading={loading} />
            <h1>Админ-Панель</h1>
            <div className={styles.adminpage}>
                <h2>Добавить комплектующие</h2>
                <div className={styles.adminheader}>
                    <label className={styles.label}>Выберите тип</label>
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
                    {model.map(elem => {
                        return (
                            <div className={styles.wrapper}>
                                <label className={styles.label}>{elem}</label>
                                <Input
                                    className={styles.inputcomponent}
                                    onChange={({ target }) => {
                                        setModelValues(prev => {
                                            return { ...prev, [elem]: target.value };
                                        });
                                    }}
                                    key={elem + selected}
                                />
                            </div>
                        );
                    })}
                </div>
                <Button
                    className={styles.createbtn}
                    onClick={() => {
                        setLoading(true);
                        createHardware(selected, modelValues)
                            .then(res => {
                                setSelected("");
                                setModelValues({});
                            })
                            .catch(err => {
                                //TODO
                            })
                            .finally(() => {
                                setLoading(false);
                            });
                    }}
                >
                    Создать
                </Button>
            </div>
        </div>
    );
}

export default AdminPage;
