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
import multiModuleStyles from "../../utility/multiModuleStyles.js";
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
                                <div className={styles.paymenttitle}>Оплата</div>
                                <PaymentList />
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
function PaymentItem({ children, title, description, onClick, picture = false, isActive = false, ...props }) {
    const item = useRef();
    return (
        <div
            ref={item}
            className={multiModuleStyles(styles.paymentitem, isActive ? styles.active : "")}
            onClick={onClick}
            {...props}
        >
            <div className={styles.title}>{title}</div>
            <div className={styles.description}>
                {description}
                {picture && (
                    <svg
                        version="1.1"
                        id="Layer_1"
                        xmlns="http://www.w3.org/2000/svg"
                        x="16px"
                        y="16px"
                        viewBox="0 0 8000 400"
                    >
                        <g id="Page-1">
                            <g id="Artboard" transform="translate(-91.000000, -154.000000)">
                                <g id="Group" transform="translate(91.000000, 154.000000)">
                                    <path
                                        id="Combined-Shape"
                                        style={{ fill: "#37a72e" }}
                                        d="M544.1,240.5v108h60v-64h68c28.6-0.2,52.9-18.5,62.1-44H544.1z"
                                    />
                                    <path
                                        id="Combined-Shape_1_"
                                        style={{ fill: "#00A0E5" }}
                                        d="M536.1,151.5c3.5,44.1,45.3,79,96.3,79c0.2,0,104.3,0,104.3,0
c0.8-4,1.2-8.2,1.2-12.5c0-36.6-29.5-66.2-66-66.5L536.1,151.5z"
                                    />
                                    <path
                                        id="Combined-Shape_2_"
                                        style={{ fill: "#37a72e" }}
                                        d="M447.3,229.4l0-0.1L447.3,229.4c0.7-1.2,1.8-1.9,3.2-1.9c2,0,3.5,1.6,3.6,3.5l0,0
v116.5h60v-196h-60c-7.6,0.3-16.2,5.8-19.4,12.7L387,266.6c-0.1,0.4-0.3,0.8-0.5,1.2l0,0l0,0c-0.7,1-1.9,1.7-3.3,1.7
c-2.2,0-4-1.8-4-4v-114h-60v196h60v0c7.5-0.4,15.9-5.9,19.1-12.7l49-105.1C447.2,229.6,447.3,229.5,447.3,229.4L447.3,229.4z"
                                    />
                                    <path
                                        id="Combined-Shape_3_"
                                        style={{ fill: "#37a72e" }}
                                        d="M223.3,232.8l-35.1,114.7H145L110,232.7c-0.3-1.8-1.9-3.2-3.9-3.2
c-2.2,0-3.9,1.8-3.9,3.9c0,0,0,0,0,0l0,114h-60v-196h51.5H109c11,0,22.6,8.6,25.8,19.1l29.2,95.5c1.5,4.8,3.8,4.7,5.3,0
l29.2-95.5c3.2-10.6,14.8-19.1,25.8-19.1h15.3h51.5v196h-60v-114c0,0,0,0,0-0.1c0-2.2-1.8-3.9-3.9-3.9
C225.2,229.5,223.6,230.9,223.3,232.8L223.3,232.8z"
                                    />
                                </g>
                            </g>
                        </g>
                    </svg>
                )}
            </div>
        </div>
    );
}
function PaymentList() {
    const components = [
        { id: 1, title: "Банковской картой", description: "Оплата картой курьеру при получении заказа", picture: true },
        { id: 2, title: "Онлайн", description: "Безопасная оплата банковской картой онлайн", picture: true },
        { id: 3, title: "Наличными", description: "Оплата наличными курьеру при получении заказа", picture: false },
    ];
    const [selectedId, setSelectedId] = useState(null);
    const handleSelect = id => {
        if (selectedId === id) {
            setSelectedId(null);
            return;
        }
        setSelectedId(id);
    };
    return (
        <div className={styles.payment}>
            {components.map(elem => {
                return (
                    <PaymentItem
                        title={elem.title}
                        description={elem.description}
                        picture={elem.picture}
                        onClick={() => {
                            handleSelect(elem.id);
                        }}
                        isActive={selectedId === elem.id}
                    />
                );
            })}
        </div>
    );
}