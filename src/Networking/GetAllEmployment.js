import AxiosConfig from "./AxiosConfig";

export const getEmploymentType = async (bodydata) => {
    return await AxiosConfig.post("/employmentType/getEmploymentType", bodydata)
}