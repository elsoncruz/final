import  AxiosConfig  from "./AxiosConfig"

export const ApplicationGet=async()=>{
    return await AxiosConfig.post('/application/getApplication')
}

export const ApplicationDelete=async(appId)=>{
    return await AxiosConfig.post(`/application/deleteApplication?id=${appId}`)
}

export const UpdateApplicationList=async(upId,id2)=>{
    return await AxiosConfig.post(`/application/updateStatus?id=${id2}&statusId=${upId}`)
}

export const ApplicationStatus=async()=>{
    return await AxiosConfig.post('/applicationStatus/getAllApplicationStatus')
}