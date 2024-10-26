import AxiosConfig  from "./AxiosConfig"

export const getVoices = async () => {
    return await AxiosConfig.post('/voicesOfEloiacs/getAllVoicesOfEloiacs');
};

export const addVoices = async (bodyData) => {
    return await AxiosConfig.post('/voicesOfEloiacs/addVoicesOfEloiacs', bodyData);
};

export const updateVoices = async (bodyData) => {
    return await AxiosConfig.post('/voicesOfEloiacs/editVoiceOfEloiacs', bodyData);
};

export const deleteVoices = async (id) => {
    return await AxiosConfig.post('/voicesOfEloiacs/deleteVoicesOfEloiacs', id);
};