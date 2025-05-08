import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Context } from "../../index.js";
import { authRoutes, publicRoutes } from "../../routes.js";

import MainLayout from "../../layouts/MainLayout/index.js";
import { MAIN_ROUTE } from "../../utility/constants.js";

function AppRouter() {
    const { user } = useContext(Context);

    const getLayout = () => {
        return MainLayout;
    };
    const Layout = getLayout();
    return (
        <Layout>
            <Routes>
                {user.isAuth &&
                    authRoutes.map(({ path, Component, requireRole, nest }) => {
                        if (user.user?.role !== requireRole) return null;
                        return (
                            <Route key={path} path={path} Component={Component}>
                                {(nest?.length > 0 ? nest : []).map(({ path, Component }) => {
                                    return <Route key={path} path={path} Component={Component} />;
                                })}
                            </Route>
                        );
                    })}
                {publicRoutes.map(({ path, Component, nest }) => {
                    return (
                        <Route key={path} path={path} Component={Component}>
                            {(nest?.length > 0 ? nest : []).map(({ path, Component }) => {
                                console.log(path);
                                return <Route key={path} path={path} Component={Component} />;
                            })}
                        </Route>
                    );
                })}
                <Route path="*" element={<Navigate to={MAIN_ROUTE} />} />
            </Routes>
        </Layout>
    );
}
export default observer(AppRouter);
