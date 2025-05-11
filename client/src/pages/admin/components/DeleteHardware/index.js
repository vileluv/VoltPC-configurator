import React, { useEffect, useRef, useState } from "react";
import styles from "./DeleteHardware.module.scss";
import Select from "../../../../components/common/Select/index.js";
import { ITEMS_LIST } from "../../../../utility/constants.js";
import { deleteHardware } from "../../../../api/adminAPI.js";
import Spinner from "../../../../components/Spinner/index.js";
import Button from "../../../../components/common/Button/index.js";
import { getHardwaresWithFilters } from "../../../../api/configuratorAPI.js";
function DeleteHardware() {
    const [selected, setSelected] = useState("");
    const [value, setValue] = useState(0);
    const [loading, setLoading] = useState(false);

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
                        <div className={styles.wrapper} key={selected}>
                            <div className={styles.label}>Выберите элемент</div>
                            <CustomSelect
                                onChange={({ target }) => {
                                    setValue(target.value);
                                }}
                                apiMethod={async () => {
                                    const field = selected;

                                    return await getHardwaresWithFilters(field.toLowerCase(), {}, 1, 100);
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
                        data.map(({ fullName, id }) => ({
                            name: fullName,
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
