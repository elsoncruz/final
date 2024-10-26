import AxiosConfig from "../Networking/AxiosConfig";

export const jobOpening = async (bodydata) => {
    return await AxiosConfig.post("/jobOpenings/getAllJobOpenings", bodydata)
}