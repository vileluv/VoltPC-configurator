import Admin from "./pages/admin/index.js";
import Auth from "./pages/auth/index.js";
import Main from "./pages/main/index.js";
import AboutPage from "./pages/about/index.js";
import FaqPage from "./pages/faq/index.js";
import WarrantyPage from "./pages/warranty/index.js";
import {
    ABOUT_ROUTE,
    ADMIN_ROUTE,
    CREATE_FOREIGN_ROUTE,
    CREATE_HARDWARE_ROUTE,
    DELETE_FOREIGN_ROUTE,
    DELETE_HARDWARE_ROUTE,
    FAQ_ROUTE,
    HARDWARE_ROUTE,
    LOGIN_ROUTE,
    MAIN_ROUTE,
    REGISTRATION_ROUTE,
    WARRANTY_ROUTE,
} from "./utility/constants.js";
import CreateHardware from "./pages/admin/components/CreateHardware/index.js";
import CreateForeign from "./pages/admin/components/CreateForeign/index.js";
import DeleteHardware from "./pages/admin/components/DeleteHardware/index.js";
import DeleteForeign from "./pages/admin/components/DeleteForeign/index.js";
import HardwarePage from "./pages/hardware/index.js";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin,
        requireRole: "ADMIN",
        nest: [
            { path: CREATE_HARDWARE_ROUTE, Component: CreateHardware },
            { path: DELETE_HARDWARE_ROUTE, Component: DeleteHardware },
            { path: CREATE_FOREIGN_ROUTE, Component: CreateForeign },
            { path: DELETE_FOREIGN_ROUTE, Component: DeleteForeign },
        ],
    },
];

export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        Component: Main,
    },
    {
        path: HARDWARE_ROUTE,
        Component: HardwarePage,
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
