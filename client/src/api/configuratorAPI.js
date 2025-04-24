import { authHost, host } from ".";
export const getHardwares = async (type, page = 1, limit = 10) => {
    try {
        const { data } = await host.get(`api/${type}`, {
            params: {
                page,
                limit,
            },
        });
        return data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};
export const getHardwaresWithFilters = async (type, filters, page = 1, limit = 10) => {
    try {
        const { data } = await host.post(
            `api/${type}/filters`,
            {
                data: filters,
            },
            {
                params: {
                    page,
                    limit,
                },
            }
        );
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
