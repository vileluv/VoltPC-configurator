import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./Configurator.module.scss";
import { ITEMS_LIST } from "../../utility/constants.js";
import Item from "../Item/index.js";
import Input from "../common/Input/index.js";
import { observer } from "mobx-react-lite";
import { Context } from "../../index.js";
import { getHardwaresFromCode, getHardwaresWithFilters } from "../../api/configuratorAPI.js";
import Spinner from "../Spinner/index.js";
import Button from "../common/Button/index.js";
import HardwareComponent from "../HardwareComponent/index.js";
import { reaction } from "mobx";
import Modal from "../Modal/index.js";
function Configurator() {
    const [confCode, setConfCode] = useState("");
    const confCodeRef = useRef(confCode);
    useEffect(() => {
        confCodeRef.current = confCode;
    }, [confCode]);
    const [loading, setLoading] = useState(false);
    const [recomendedPower, setRecomendedPower] = useState({});
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
    function getPowerRequest(consumption) {
        setLoading(true);
        getHardwaresWithFilters("power", { power: { min: Math.ceil(Number(consumption) * 1.15), max: null } }, 1, 1, {
            power: 1,
        })
            .then(res => {
                setRecomendedPower(res?.rows?.[0]||{});
            })
            .catch(() => {})
            .finally(() => {
                setLoading(false);
            });
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
                .catch(() => {})
                .finally(() => {
                    setLoading(false);
                });
        } catch (e) {
            return;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [confCode]);

    useEffect(() => {
        const disposer = reaction(
            () => configurator.confCode,
            storeConfcode => {
                if (storeConfcode !== confCodeRef.current) setConfCode("");
            }
        );
        return () => disposer();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        getPowerRequest(configurator.consumption);
        const disposer = reaction(
            () => configurator.consumption,
            consumption => {
                if (consumption <= 0) return;
                getPowerRequest(consumption);
            }
        );
        return () => disposer();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                        <div className={styles.wrapper}>
                            <div className={styles.title}>Рекомендуемый блок питания</div>
                            {Object.keys(recomendedPower).length > 0 ? (
                                <HardwareComponent
                                    vertical
                                    type={"power"}
                                    values={recomendedPower}
                                    onButtonClick={() => {
                                        configurator.setComponent("power", recomendedPower);
                                    }}
                                />
                            ) : (
                                <div className={styles.warn}>Нет подходящего блока питания</div>
                            )}
                        </div>
                        <div className={styles.powerinfo}>
                            Предполагаемое потребление : {configurator.consumption} Вт
                        </div>
                        <Button
                            className={styles.getconfbtn}
                            onClick={() => {
                                navigator.clipboard.writeText(configurator.confCode);
                            }}
                        >
                            Скопировать код конфигурации
                        </Button>
                        <Modal
                            btnClassName={styles.getconfbtn}
                            btnName={isRequireFull ? "Собрать" : "Недостаточно комплектующих"}
                            danger={!isRequireFull}
                            disabled={!isRequireFull}
                        >
                            <div className={styles.modal}>
                                <div className={styles.modal__header}>
                                    <h2 className={styles.title}>Сборка заказа</h2>
                                </div>
                                <div className={styles.hardwares}>
                                    {configurator.getComponents().map((e, i) => (
                                        <HardwareComponent values={e} key={i + e.name} withoutBtn />
                                    ))}
                                </div>
                                <div className={styles.priceinfo}>
                                    Общая стоимость:&nbsp;
                                    {configurator.getComponents().reduce(
                                        (acc, value) => {
                                            return Number(acc) + Number(value.price);
                                        },
                                        [0]
                                    )}
                                    ₽
                                </div>
                                <Button className={styles.modalbtn}>Купить</Button>
                            </div>
                        </Modal>
                    </>
                )}
            </aside>
        </div>
    );
}

export default observer(Configurator);
