import React, { useContext, useEffect, useState } from "react";
import styles from "./Modal.module.scss";
import Spinner from "../Spinner/index.js";
import Button from "../common/Button/index.js";
import { observer } from "mobx-react-lite";
function Modal({
    children,
    propsOnClick = () => {},
    propUseEffect = () => {},
    contentRef,
    customModalValue = false,
    btnName = "Button",
    loading = false,
    withButton = true,
    ...props
}) {
    const [modal, setModal] = useState(false);

    useEffect(() => {
        if (modal) {
            propUseEffect();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modal]);
    useEffect(() => {
        setModal(customModalValue);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [customModalValue]);

    const toggleModal = () => {
        setModal(!modal);
    };
    const handleContent = e => {
        e.stopPropagation();
    };
    if (modal && !loading) {
        document.body.classList.add("active-modal");
    } else {
        document.body.classList.remove("active-modal");
    }
    return (
        <div className={styles.root} {...props}>
            {withButton && (
                <Button
                    onClick={() => {
                        toggleModal();
                        propsOnClick();
                    }}
                    className={styles.modalbtn}
                >
                    {btnName}
                </Button>
            )}
            {loading ? (
                <Spinner isLoading={loading} />
            ) : (
                modal && (
                    <div className={styles.modal}>
                        <div className={styles.overlay} onClick={toggleModal}></div>
                        <div className={styles.content} onClick={handleContent} ref={contentRef}>
                            <div className={styles.relative}>
                                <svg
                                    className={styles.close}
                                    onClick={toggleModal}
                                    fill="#000000"
                                    width="16px"
                                    height="16px"
                                    viewBox="0 0 16 16"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g strokeWidth="0"></g>
                                    <g strokeLinecap="round" strokeLinejoin="round"></g>
                                    <g>
                                        <path
                                            d="M0 14.545L1.455 16 8 9.455 14.545 16 16 14.545 9.455 8 16 1.455 14.545 0 8 6.545 1.455 0 0 1.455 6.545 8z"
                                            fillRule="evenodd"
                                        ></path>
                                    </g>
                                </svg>

                                {children}
                            </div>
                        </div>
                    </div>
                )
            )}
        </div>
    );
}

export default observer(Modal);
