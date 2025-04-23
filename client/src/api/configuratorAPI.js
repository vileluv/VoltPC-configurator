import { authHost, host } from ".";
export const getHardwares = async (type, filters, page = 1, limit = 10) => {
    try {
        const { data } = await host.get(`api/${type}`, {
            params: {
                page,
                limit,
                ...filters,
            },
        });
        return data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};
export const getHardware = async (type, id) => {
    try {
        const { data } = await host.get(`api/${type}/${id}`, {
            params: {
                id,
            },
        });
        return data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};
