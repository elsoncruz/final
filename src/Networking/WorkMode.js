import AxiosConfig from "../Networking/AxiosConfig";

export const WorkMode = async (bodydata) => {
    return await AxiosConfig.post("/workMode/getWorkMode", bodydata)
}