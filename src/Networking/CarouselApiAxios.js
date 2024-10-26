import AxiosConfig from "./AxiosConfig"




export const AddCarouselServices=async(AddCarousel)=>{
    return await AxiosConfig.post('/servicesCarousel/addServicesCarousel',AddCarousel)
}
export const GetCarouselsev=async()=>{
    return await AxiosConfig.post('/servicesCarousel/getAllServicesCarousel')
}

export const DeleteCarousel=async(id)=>{
    const data={
        "requestId": id,
      }
    return await AxiosConfig.post('/servicesCarousel/deleteServicesCarousel',data)
}

export const UpdateCarousel=async(UpId)=>{
 return await AxiosConfig.post('/servicesCarousel/editServicesCarousel',UpId)
}