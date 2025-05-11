import React, { useEffect, useRef, useState } from "react";
import styles from "./DeleteForeign.module.scss";
import Select from "../../../../components/common/Select/index.js";
import { FOREIGNS_LIST, ITEMS_LIST } from "../../../../utility/constants.js";
import { deleteForeign, getForeigns, getModel } from "../../../../api/adminAPI.js";
import Spinner from "../../../../components/Spinner/index.js";
import Button from "../../../../components/common/Button/index.js";
import { getHardwaresWithFilters } from "../../../../api/configuratorAPI.js";
function DeleteForeign() {
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
            <h2>Удалить элемент связи</h2>
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
                    {model.length !== 0 &&
                        (model.length > 1 ? (
                            model.map(elem => {
                                return (
                                    <div className={styles.wrapper} key={elem}>
                                        <div className={styles.label}>{"Выберите элемент " + elem}</div>

                                        <CustomSelect
                                            onChange={({ target }) => {
                                                setModelValues(prev => {
                                                    return { ...prev, [elem]: target.value };
                                                });
                                            }}
                                            apiMethod={async () => {
                                                const field = currentSpecification.relations[elem];

                                                if (
                                                    ITEMS_LIST.find(f => f.type === field.toLowerCase()) !== undefined
                                                ) {
                                                    return await getHardwaresWithFilters(
                                                        field.toLowerCase(),
                                                        {},
                                                        1,
                                                        100
                                                    );
                                                }
                                                return await getForeigns(field);
                                            }}
                                        />
                                    </div>
                                );
                            })
                        ) : (
                            <div className={styles.wrapper} key={currentSpecification.type}>
                                <div className={styles.label}>Выберите элемент </div>
                                <CustomSelect
                                    onChange={({ target }) => {
                                        setModelValues(prev => {
                                            return { ...prev, id: target.value };
                                        });
                                    }}
                                    apiMethod={async () => {
                                        const field = currentSpecification.type;

                                        return await getForeigns(field);
                                    }}
                                />
                            </div>
                        ))}
                </div>
                {selected !== "" && (
                    <Button
                        className={styles.createbtn}
                        danger
                        onClick={() => {
                            setLoading(true);
                            deleteForeign(selected, modelValues)
                                .then(res => {
                                    setSelected("");
                                    setModelValues({});
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

export default DeleteForeign;
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
