import AxiosConfig from "./AxiosConfig";

export const getContact = async (bodydata) => {
    return await AxiosConfig.post("/contactUs/getContactUs", bodydata)
}

