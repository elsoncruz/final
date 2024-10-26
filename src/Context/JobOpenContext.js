import { createContext, useEffect, useState } from "react";
import { GetJobOpenWorkMode, GetJobRole, GetJopEmployment, GetJopOpenDepartment, KeySkill } from "../Networking/JobopenApiAxios";



const JobOpenContext=createContext()
const JobOpenConT=(props)=>{
    const [workModes, setWorkModes] = useState([])
    const [departments, setDepartments] = useState([])
    const [employmentTypes, setEmploymentTypes] = useState([])
    const [jobRole,setJobRole]=useState([])
    const [keySkill,setKeySkill]=useState([])

    useEffect(()=>{
        GetJobOpenWorkMode().then(res=>setWorkModes(res.data.data))
        GetJopOpenDepartment().then(res=>setDepartments(res.data.data))
        GetJopEmployment().then(res=>setEmploymentTypes(res.data.data))
        KeySkill().then(res=>setKeySkill(res.data.data)).catch(err=>console.log(err))
        GetJobRole().then(res=>setJobRole(res.data.data)).catch(err=>console.log(err))
    },[])

    return <JobOpenContext.Provider value={{workModes,departments,employmentTypes,keySkill,jobRole}}>
         {props.children}
    </JobOpenContext.Provider>
}
export {JobOpenContext,JobOpenConT}