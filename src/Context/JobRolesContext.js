import { createContext, useState } from "react"


const JobRoleState=createContext()
const JobRoleContext=(props)=>{
    
const [jobRoleList,setJobRoleList]=useState([])

const getJobRoles=(update)=>{
        setJobRoleList(update)
}
return <JobRoleState.Provider value={{jobRoleList,setJobRoleList,getJobRoles}}>
    {props.children}
</JobRoleState.Provider>
}

export {JobRoleState,JobRoleContext}