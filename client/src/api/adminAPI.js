import { authHost, host } from ".";
export const getModel = async type => {
    try {
        const { data } = await authHost.get(`api/${type}/model`, { params: {} });
        return data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};
export const createHardware = async (type, body) => {
    try {
        const { data } = await authHost.post(`api/${type}/create`, { data: body });
        return data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};
