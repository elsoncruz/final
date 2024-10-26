import AxiosConfig from "./AxiosConfig";

export const getDepartment = async(bodydata) => {
    return await AxiosConfig.post("/department/getAllDepartment", bodydata)
}

