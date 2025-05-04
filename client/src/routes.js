import Admin from "./pages/admin/index.js";
import Auth from "./pages/auth/index.js";
import Main from "./pages/main/index.js";
import AboutPage from "./pages/about/index.js";
import FaqPage from "./pages/faq/index.js";
import WarrantyPage from "./pages/warranty/index.js";
import {
    ABOUT_ROUTE,
    ADMIN_ROUTE,
    FAQ_ROUTE,
    LOGIN_ROUTE,
    MAIN_ROUTE,
    REGISTRATION_ROUTE,
    WARRANTY_ROUTE,
} from "./utility/constants.js";
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
    {
        path: ABOUT_ROUTE,
        Component: AboutPage,
    },
    {
        path: FAQ_ROUTE,
        Component: FaqPage,
    },
    {
        path: WARRANTY_ROUTE,
        Component: WarrantyPage,
    },
];
