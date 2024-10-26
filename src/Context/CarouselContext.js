import { createContext, useEffect, useState } from "react";
// import {GetCarouselsev} from "../Networking/CarouselApiAxios";

const CarouselContext=createContext();

const CarouselConT=(props)=>{
    const [getCarouselItem,setCarouselItem]=useState([])
    const [carouselId,setCarouselId]=useState(0)
    const [carouseltitle,setCarouselTitle]=useState('')
    const [carouseldescription,setCarouselDescription]=useState('')


    const ServicesCarousel=(serviceData)=>{
        setCarouselItem(serviceData)
    }
    return <CarouselContext.Provider value={{getCarouselItem,carouselId,setCarouselId,carouseltitle,setCarouselTitle,
        carouseldescription,setCarouselDescription,ServicesCarousel,setCarouselItem}}>
        {props.children}
    </CarouselContext.Provider>
}
export {CarouselContext,CarouselConT}