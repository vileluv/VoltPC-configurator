import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { Context } from "./index.js";
import "./styles/globals.scss";
import Spinner from "./components/Spinner/index.js";
import AppRouter from "./components/AppRouter/index.js";

function App() {
    const [loading, setLoading] = useState(true);
    const { user } = useContext(Context);
    useEffect(() => {
        user.setIsAuth(true);
        setLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <BrowserRouter>{loading ? <Spinner isLoading={loading} /> : <AppRouter />}</BrowserRouter>;
}

export default observer(App);
