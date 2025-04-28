import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./Configurator.module.scss";
import { ITEMS_LIST } from "../../utility/constants.js";
import Item from "../Item/index.js";
import Input from "../common/Input/index.js";
import { observer } from "mobx-react-lite";
import { Context } from "../../index.js";
import { getHardwaresFromCode } from "../../api/configuratorAPI.js";
import Spinner from "../Spinner/index.js";
import Button from "../common/Button/index.js";
function Configurator() {
    const [confCode, setConfCode] = useState("");
    const [loading, setLoading] = useState(false);
    const { configurator } = useContext(Context);
    const isFirstRender = useRef(true);

    function checkRequire() {
        for (const obj of ITEMS_LIST) {
            if (obj.require) {
                if (configurator.getComponent(obj.type)?.id === undefined) {
                    return false;
                }
            }
        }
        return true;
    }
    const isRequireFull = checkRequire();
    useEffect(() => {
        if (isFirstRender.current) {
            return;
        }

        try {
            JSON.parse(atob(confCode));
            setLoading(true);
            getHardwaresFromCode(confCode)
                .then(res => {
                    configurator.setComponents(res);
                })
                .catch(() => {
                    //TODO
                })
                .finally(() => {
                    setLoading(false);
                });
        } catch (e) {
            return;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [confCode]);
    useEffect(() => {
        if (isFirstRender.current) {
            return;
        }
        if (configurator.confCode !== confCode) setConfCode("");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [configurator.confCode]);
    useEffect(() => {
        isFirstRender.current = false;
    }, []);

    return (
        <div className={styles.root}>
            <Spinner isLoading={loading} />
            <div className={styles.configurator}>
                <div className={styles.configurator__header}>
                    <div className={styles.configurator__header__left}>
                        <h2>Системный блок</h2>
                        <span className={styles.mandatory}>* Обязательные комплектующие</span>
                    </div>
                    <div className={styles.configurator__header__right}>
                        {!configurator.isEmpty() && (
                            <span
                                className={styles.clearconf}
                                onClick={() => {
                                    configurator.clearComponents();
                                }}
                            >
                                Очистить конфигуратор
                            </span>
                        )}
                        <Input
                            value={confCode}
                            onChange={({ target }) => {
                                setConfCode(target.value);
                            }}
                            placeholder="Код конфигурации"
                        />
                    </div>
                </div>
                <div className={styles.configurator__body}>
                    {ITEMS_LIST.map(({ type, name, require }) => (
                        <Item key={type} itemName={name} itemType={type} require={require} />
                    ))}
                </div>
            </div>
            <aside className={styles.aside}>
                {configurator.isEmpty() ? (
                    <span className={styles.placeholder}>Выберите комплектующие</span>
                ) : (
                    <>
                        <div className={styles.power}></div>
                        <div className={styles.powerinfo}>
                            Предполагаемое потребление : {configurator.getConsumption()} Вт
                        </div>
                        <Button
                            className={styles.getconfbtn}
                            onClick={() => {
                                navigator.clipboard.writeText(configurator.confCode);
                            }}
                        >
                            Скопировать код конфигурации
                        </Button>
                        <Button
                            className={styles.getconfbtn}
                            danger={!isRequireFull}
                            disabled={!isRequireFull}
                            onClick={() => {
                                //TODO
                            }}
                        >
                            {isRequireFull ? "Собрать" : "Недостаточно комплектующих"}
                        </Button>
                    </>
                )}
            </aside>
        </div>
    );
}

export default observer(Configurator);
