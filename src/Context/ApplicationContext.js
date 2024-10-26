import { createContext, useEffect, useState } from "react";
import { ApplicationGet, ApplicationStatus} from "../Networking/ApplicationApiAxios";


const AppContext=createContext()
const ApplicationConT=(props)=>{
    const [getApplication,setApplication]=useState([])
    const [appStatus,setAppStatus]=useState([])
    
    useEffect(()=>{
        ApplicationGet().then(res=>setApplication(res.data.data)).catch(err=>console.log(err))
        ApplicationStatus().then(res=>setAppStatus(res.data.data)).catch(err=>console.log(err))
    },[])
    
    const ApplicationData=()=>{
        ApplicationGet().then(res=>setApplication(res.data.data)).catch(err=>console.log(err))
    }

    return <AppContext.Provider value={{ApplicationData,getApplication,appStatus}}>
        {props.children}
    </AppContext.Provider>
}
export {AppContext,ApplicationConT}