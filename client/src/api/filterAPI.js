import { authHost, host } from ".";
export const getFilters = async type => {
    try {
        const { data } = await host.get(`api/filters`, {
            params: {
                type,
            },
        });
        return data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};
