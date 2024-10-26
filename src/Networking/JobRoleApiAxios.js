import AxiosConfig from "./AxiosConfig"


export const AddRoles=async(data)=>{
    return await AxiosConfig.post('/jobRole/addJobRole',data)
}

export const GetAllJobRole=async()=>{
    return await AxiosConfig.post('/jobRole/getAllJobRole')
}