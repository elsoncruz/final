import AxiosConfig from "./AxiosConfig"



///Job-Opening-controller
export const GetJobOpenWorkMode=async()=>{
    return await AxiosConfig.post('/workMode/getWorkMode')
}
export const GetJopOpenDepartment=async()=>{
    return await AxiosConfig.post('/department/getAllDepartment')
}
export const GetJopEmployment=async()=>{
    return await AxiosConfig.post('/employmentType/getEmploymentType')
}

export const AddJobOpen=async(data)=>{
    return await AxiosConfig.post('/jobOpenings/addJobOpening',data)
}

export const KeySkill = async()=>{
    return await AxiosConfig.post('/keySkills/getKeySkills')
}
export const GetJobRole=async()=>{
    return await AxiosConfig.post('/jobRole/getAllJobRole')
}