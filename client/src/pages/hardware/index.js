import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getHardware } from "../../api/configuratorAPI.js";
import styles from "./HardwarePage.module.scss";
import { HARDWARE_SPECIFICATIONS } from "../../utility/constants.js";
import { host } from "../../api/index.js";
import Spinner from "../../components/Spinner/index.js";
import Button from "../../components/common/Button/index.js";
import { Context } from "../../index.js";
import { observer } from "mobx-react-lite";

const HardwarePage = observer(() => {
    const { type, id } = useParams();
    const [loading, setLoading] = useState(false);
    const [hardware, setHardware] = useState({});
    const { configurator } = useContext(Context);
    const navigate = useNavigate();
    async function getHardwareRequest() {
        setLoading(true);
        getHardware(type, id)
            .then(res => {
                if (!res) {
                    navigate("/");
                    return;
                }
                setHardware(res);
            })
            .catch(err => {})
            .finally(() => {
                setLoading(false);
            });
    }

    useEffect(() => {
        getHardwareRequest();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={styles.root}>
            <Spinner isLoading={loading} />
            <h1>Характеристики</h1>
            <div className={styles.page}>
                <h2>{hardware.fullName}</h2>
                <div className={styles.allwrapper}>
                    <div className={styles.rawwrap}>
                        <img className={styles.image} src={`${host.getUri()}${hardware.img}`} alt={hardware.name} />
                        <div className={styles.columnwrap}>
                            <div className={styles.price}>{hardware.price} ₽</div>
                            {configurator.getComponent(type)?.id === Number(id) ? (
                                <>
                                    <span className={styles.current}>Выбрано</span>{" "}
                                    <Button
                                        onClick={() => {
                                            configurator.setComponent(type, {});
                                        }}
                                        danger
                                    >
                                        Удалить
                                    </Button>
                                </>
                            ) : (
                                <Button
                                    onClick={() => {
                                        configurator.setComponent(type, hardware);
                                    }}
                                >
                                    Добавить
                                </Button>
                            )}
                        </div>
                    </div>

                    <div className={styles.gridwrap}>
                        {Object.keys(HARDWARE_SPECIFICATIONS[type])
                            .filter(f => f !== "img" && f !== "price")
                            .map(element => {
                                const value =
                                    hardware[HARDWARE_SPECIFICATIONS[type][element]?.foreign]?.name ||
                                    hardware[HARDWARE_SPECIFICATIONS[type][element]?.foreign]
                                        ?.map(e => e.name)
                                        ?.toString() ||
                                    hardware[element];
                                const title = HARDWARE_SPECIFICATIONS[type][element]?.title;

                                if (value === null) return <></>;
                                return (
                                    <div className={styles.wrapper} key={title + value}>
                                        <div className={styles.label}>{title}:</div>
                                        <div className={styles.value}>
                                            {value} {HARDWARE_SPECIFICATIONS[type][element]?.sign || ""}
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
        </div>
    );
});
export default HardwarePage;
