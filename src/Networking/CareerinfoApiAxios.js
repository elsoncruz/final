import AxiosConfig from "./AxiosConfig"



///Career-Info
export const CareerInfo=async()=>{
    return await AxiosConfig.post('/careerInfo/getCareerInfo')
}