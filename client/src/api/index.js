import axios from "axios";

const host = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

const authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

const authInterceptor = cfg => {
    cfg.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
    return cfg;
};

authHost.interceptors.request.use(authInterceptor);

export { host, authHost };
