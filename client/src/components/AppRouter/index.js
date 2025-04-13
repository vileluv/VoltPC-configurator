import React, { useContext } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Context } from "../../index.js";
import { authRoutes, publicRoutes } from "../../routes.js";

import MainLayout from "../../layouts/MainLayout/index.js";
import { MAIN_ROUTE } from "../../utility/constants.js";
function AppRouter() {
    const { user } = useContext(Context);
    const location = useLocation();
    const path = location.pathname;
    const getLayout = () => {
        if (path.startsWith("/admin")) return MainLayout;
        return MainLayout;
    };
    const Layout = getLayout();
    return (
        <Layout>
            <Routes>
                {user.isAuth &&
                    authRoutes.map(({ path, Component }) => {
                        return <Route key={path} path={path} Component={Component} />;
                    })}
                {publicRoutes.map(({ path, Component }) => {
                    return <Route key={path} path={path} Component={Component} />;
                })}
                <Route path="*" element={<Navigate to={MAIN_ROUTE} />} />
            </Routes>
        </Layout>
    );
}
export default observer(AppRouter);
