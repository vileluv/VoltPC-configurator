import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { Context } from "./index.js";
import "./styles/globals.scss";
import Spinner from "./components/Spinner/index.js";
import AppRouter from "./components/AppRouter/index.js";
import { check } from "./api/userAPI.js";
import { getHardwaresFromCode } from "./api/configuratorAPI.js";

function App() {
    const [loading, setLoading] = useState(true);
    const { user, configurator } = useContext(Context);
    useEffect(() => {
        check()
            .then(data => {
                user.setUser(data);
                user.setIsAuth(true);
            })
            .catch(err => {
                user.setUser({});
                user.setIsAuth(false);
            })
            .finally(() => setLoading(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        try {
            JSON.parse(atob(user.user?.confcode));
            setLoading(true);
            getHardwaresFromCode(user.user?.confcode)
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
    }, [user.user]);

    return <BrowserRouter>{loading ? <Spinner isLoading={loading} /> : <AppRouter />}</BrowserRouter>;
}

export default observer(App);
