import { createContext, useState } from "react";

const DepartmentState = createContext()

const DepartmentContext = (props) => {
   const [getDepartment, setGetDepartment] = useState([])

   const updateDepartment = (data) => {
    setGetDepartment(data)
   }

   return <DepartmentState.Provider value={{
        getDepartment:getDepartment, 
        updateDepartment:updateDepartment
    }} >
    {props.children}</DepartmentState.Provider>

}
export {DepartmentContext, DepartmentState}