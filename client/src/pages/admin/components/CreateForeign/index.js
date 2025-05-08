import React, { useEffect, useRef, useState } from "react";
import styles from "./CreateForeign.module.scss";
import Select from "../../../../components/common/Select/index.js";
import { FOREIGNS_LIST, ITEMS_LIST } from "../../../../utility/constants.js";
import { createForeign, getForeigns, getModel } from "../../../../api/adminAPI.js";
import Spinner from "../../../../components/Spinner/index.js";
import Input from "../../../../components/common/Input/index.js";
import Button from "../../../../components/common/Button/index.js";
import { getHardwaresWithFilters } from "../../../../api/configuratorAPI.js";
function CreateForeign() {
    const [selected, setSelected] = useState("");
    const [modelValues, setModelValues] = useState({});
    const [loading, setLoading] = useState(false);
    const [model, setModel] = useState([]);
    const isFirstRender = useRef(true);
    const [currentSpecification, setCurrentSpecification] = useState({});
    async function modelRequest() {
        setLoading(true);
        getModel(selected)
            .then(res => {
                if (!res) return;
                setModel(res);
                setCurrentSpecification(FOREIGNS_LIST.find(f => f.type === selected));
            })
            .catch(err => {})
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
            <h2>Создать элемент связи</h2>
            <div className={styles.adminpage}>
                <div className={styles.adminheader}>
                    <h3>Выберите тип</h3>
                    <Select
                        value={selected}
                        options={FOREIGNS_LIST.map(({ name, type }) => {
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
                            <div className={styles.wrapper} key={elem}>
                                <div className={styles.label}>{elem}</div>
                                {currentSpecification?.relations !== undefined ? (
                                    <CustomSelect
                                        onChange={({ target }) => {
                                            setModelValues(prev => {
                                                return { ...prev, [elem]: target.value };
                                            });
                                        }}
                                        apiMethod={async () => {
                                            const field = currentSpecification.relations[elem];

                                            if (ITEMS_LIST.find(f => f.type === field.toLowerCase()) !== undefined) {
                                                return await getHardwaresWithFilters(field.toLowerCase(), {}, 1, 100);
                                            }
                                            return await getForeigns(field);
                                        }}
                                    />
                                ) : (
                                    <Input
                                        className={styles.inputcomponent}
                                        onChange={({ target }) => {
                                            setModelValues(prev => {
                                                return { ...prev, [elem]: target.value };
                                            });
                                        }}
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>
                {selected !== "" && (
                    <Button
                        className={styles.createbtn}
                        onClick={() => {
                            setLoading(true);
                            createForeign(selected, modelValues)
                                .then(res => {
                                    setSelected("");
                                    modelValues({});
                                })
                                .catch(err => {})
                                .finally(() => {
                                    setLoading(false);
                                });
                        }}
                    >
                        Создать
                    </Button>
                )}
            </div>
        </div>
    );
}

export default CreateForeign;
function CustomSelect({ apiMethod = async () => {}, onChange = () => {}, ...props }) {
    const [options, setOptions] = useState([]);

    useEffect(() => {
        let isMounted = true;

        async function fetchOptions() {
            try {
                let data = await apiMethod();
                if (data.rows !== undefined) {
                    data = data.rows;
                }
                if (isMounted) {
                    setOptions(
                        data.map(({ name, id }) => ({
                            name,
                            value: id,
                        }))
                    );
                }
            } catch {
                setOptions([]);
            }
        }

        fetchOptions();

        return () => {
            isMounted = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <Select className={styles.inputcomponent} options={options} onChange={onChange} {...props} />;
}
