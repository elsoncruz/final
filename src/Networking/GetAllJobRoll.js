import AxiosConfig from "./AxiosConfig";

export const getJobRole = async (bodydata) => {
    return await AxiosConfig.post("/jobRole/getAllJobRole", bodydata)
}