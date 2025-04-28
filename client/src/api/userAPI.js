import { authHost, host } from ".";
import { jwtDecode } from "jwt-decode";

export const registration = async (login, password) => {
    try {
        const { data } = await host.post("api/user/registration", { login, password, role: "USER" });
        localStorage.setItem("token", data?.token);
        return jwtDecode(data?.token);
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const login = async (login, password) => {
    try {
        const { data } = await host.post("api/user/login", { login, password });
        localStorage.setItem("token", data?.token);
        return { ...jwtDecode(data?.token), ...data?.info };
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const check = async () => {
    try {
        const { data } = await authHost.get("api/user/check");
        localStorage.setItem("token", data?.token);
        return { ...jwtDecode(data?.token), ...data?.info };
    } catch (err) {
        console.error(err);
        throw err;
    }
};
export const saveCodeConf = async (id, confcode) => {
    try {
        await authHost.post("api/user/savecode", { id: id, confcode: confcode });
    } catch (err) {
        console.error(err);
        throw err;
    }
};
