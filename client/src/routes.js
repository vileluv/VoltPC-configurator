import Admin from "./pages/admin/index.js";
import Auth from "./pages/auth/index.js";
import Main from "./pages/main/index.js";
import { ADMIN_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE } from "./utility/constants.js";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin,
        requireRole: "ADMIN",
    },
];

export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        Component: Main,
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth,
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth,
    },
];
