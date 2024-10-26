import AxiosConfig from "./AxiosConfig"



//ourServices
export const Addservicestolist = async(add)=>{
    return await AxiosConfig.post("ourServices/addOurServices",add)
}

export const GetServices=async()=>{
    return await AxiosConfig.post('/ourServices/getAllOurServices')
}

export const DeleteServices=async(id)=>{
    const dataID={
        "requestId": id,
      }
    return await AxiosConfig.post('/ourServices/deleteOurServices',dataID)
}
export const UpdateServices=async(data)=>{
      return await AxiosConfig.post('/ourServices/editOurServices',data)
}