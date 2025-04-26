import { authHost, host } from ".";
export const getHardwaresWithFilters = async (type, filters, page = 1, limit = 10, ...sortArguments) => {
    try {
        const { data } = await host.post(
            `api/${type}`,
            {
                data: filters,
            },
            {
                params: Object.assign(
                    {
                        page,
                        limit,
                    },
                    ...sortArguments
                ),
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
export const getHardwaresFromCode = async code => {
    try {
        const { data } = await host.get(`api/configurator`, {
            params: {
                code,
            },
        });
        return data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};
