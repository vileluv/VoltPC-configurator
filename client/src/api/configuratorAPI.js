import { authHost, host } from ".";
export const getHardwares = async (type, page, limit = 10) => {
    try {
        const { data } = await host.get(`api/${type}`, {
            params: {
                type,
                page,
                limit,
            },
        });
        return data;
    } catch (err) {
        console.error(err);
        return {};
    }
};
export const getHardware = async (type, page, limit = 10) => {
    try {
        const { data } = await host.get(`api/${type}`, {
            params: {
                type,
                page,
                limit,
            },
        });
        return data;
    } catch (err) {
        console.error(err);
        return {};
    }
};
