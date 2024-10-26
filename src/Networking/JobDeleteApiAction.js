import AxiosConfig from "./AxiosConfig";

export const deleteJobOpening = async(bodydata) => {
    return await AxiosConfig.post("/jobOpenings/deleteJobOpening", bodydata)
}