import Admin from "./pages/admin/index.js";
import Auth from "./pages/auth/index.js";
import Main from "./pages/main/index.js";
import { ADMIN_ROUTE, MAIN_ROUTE, AUTH_ROUTE } from "./utility/constants.js";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin,
    },
];

export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        Component: Main,
    },
    {
        path: AUTH_ROUTE,
        Component: Auth,
    },
];
