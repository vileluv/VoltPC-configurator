import React, { useEffect, useRef, useState } from "react";
import styles from "./CreateHardware.module.scss";
import Select from "../../../../components/common/Select/index.js";
import { FOREIGNS_LIST, HARDWARE_SPECIFICATIONS, INPUT_TYPES, ITEMS_LIST } from "../../../../utility/constants.js";
import { createHardware, getForeigns, getModel, uploadImage } from "../../../../api/adminAPI.js";
import Spinner from "../../../../components/Spinner/index.js";
import Input from "../../../../components/common/Input/index.js";
import Button from "../../../../components/common/Button/index.js";
function CreateHardware() {
    const [selected, setSelected] = useState("");
    const [model, setModel] = useState([]);
    const [modelValues, setModelValues] = useState({});
    const [loading, setLoading] = useState(false);
    const [currentSpecification, setCurrentSpecification] = useState("");
    const isFirstRender = useRef(true);
    async function modelRequest() {
        setLoading(true);
        getModel(selected)
            .then(res => {
                if (!res) return;
                setModel(res);
                setCurrentSpecification(HARDWARE_SPECIFICATIONS[selected]);
            })
            .catch(err => {})
            .finally(() => {
                setLoading(false);
            });
    }
    function switchInput(value, modelType) {
        switch (value.inputType) {
            case INPUT_TYPES.date:
            case INPUT_TYPES.number:
            case INPUT_TYPES.text: {
                return (
                    <Input
                        className={styles.inputcomponent}
                        onChange={({ target }) => {
                            setModelValues(prev => {
                                return { ...prev, [modelType]: target.value };
                            });
                        }}
                        type={value.inputType}
                    />
                );
            }
            case INPUT_TYPES.file: {
                return (
                    <Input
                        className={styles.inputcomponent}
                        onChange={async ({ target }) => {
                            const path = await uploadImage(target.files[0])
                                .then(res => res.path)
                                .catch(() => "");
                            setModelValues(prev => {
                                return { ...prev, [modelType]: path };
                            });
                        }}
                        type={value.inputType}
                    />
                );
            }
            case INPUT_TYPES.select: {
                return (
                    <CustomSelect
                        value={value}
                        onChange={({ target }) => {
                            setModelValues(prev => ({
                                ...prev,
                                [modelType]: target.value,
                            }));
                        }}
                    />
                );
            }
            default: {
                break;
            }
        }
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
            <h2>Создать комплектующее</h2>
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
                    {model.map(elem => {
                        const value = currentSpecification[elem];
                        return (
                            <div className={styles.wrapper} key={`${elem}-${value.title}`}>
                                <div className={styles.label}>{value.title}</div>
                                {switchInput(value, elem)}
                            </div>
                        );
                    })}
                </div>
                {selected !== "" && (
                    <Button
                        className={styles.createbtn}
                        onClick={() => {
                            setLoading(true);
                            createHardware(selected, modelValues)
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
                        Создать
                    </Button>
                )}
            </div>
        </div>
    );
}

export default CreateHardware;

function CustomSelect({ value, onChange, ...props }) {
    const [options, setOptions] = useState([]);

    useEffect(() => {
        let isMounted = true;

        async function fetchOptions() {
            try {
                const data = await getForeigns(value.foreign);
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
