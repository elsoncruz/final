import { createContext, useEffect, useState } from "react";

const ServiceContext=createContext();
const ServiceConT=(props)=>{
    const [getOurservices,setGetServices]=useState([])
    const [id,setId]=useState(0)
    const [title,setTitle]=useState('')
    const [description,setDescription]=useState('')


    const Ourservices=(update)=>{
        setGetServices(update)
        console.log(update)
    }

    return <ServiceContext.Provider value={{getOurservices,id,setId,title,setTitle,description,setDescription,Ourservices,setGetServices}}>
        {props.children}
    </ServiceContext.Provider>
}
export {ServiceConT,ServiceContext}