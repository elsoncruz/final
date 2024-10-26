import AxiosConfig from "./AxiosConfig";

export const AddDepartmentApi = async(bodyData) => {
 return await AxiosConfig.post('/department/addDepartment', bodyData)
}

export const GetDepartmentApi = async(bodyData) => {
    return await AxiosConfig.post('/department/getAllDepartment', bodyData)
}

export const UpdateDepartmentApi = async(bodyData) => {
    return await AxiosConfig.post('/department/editDepartment', bodyData)
   }

export const DeleteDepartmentApi = async(data) => {
    return await AxiosConfig.post('/department/deleteDepartment', data)
}

