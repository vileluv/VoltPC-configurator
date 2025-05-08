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
export const getForeigns = async type => {
    try {
        const { data } = await authHost.get(`api/${type}`, { params: {} });
        return data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};
export const createForeign = async (type, body) => {
    try {
        const { data } = await authHost.post(`api/${type}/create`, { data: body });
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
export const deleteForeign = async (type, body) => {
    try {
        const { data } = await authHost.delete(`api/${type}/delete`, {
            data: { data: body },
        });
        return data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};
export const deleteHardware = async (type, id) => {
    try {
        const { data } = await authHost.delete(`api/${type}/delete/${id}`, {
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
export const uploadImage = async body => {
    try {
        const form = new FormData();
        form.append("image", body);
        const { data } = await authHost.post(`/filestorage`, form, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};
