import React, { useEffect, useState } from 'react'
import { GetJopOpenDepartment } from '../../Networking/JobopenApiAxios'
import { AddRoles } from '../../Networking/JobRoleApiAxios'
import { toast, ToastContainer } from 'react-toastify'
import Loader from '../../Components/Loader'

function AddJobRole() {
    const [departments,setDepartments]=useState([])
    const [depId,setDepId]=useState(0)
    const [jobName,setJobName]=useState('')
    const [load,setLoad]=useState(false)
    useEffect(()=>{
        GetJopOpenDepartment().then(res=>setDepartments(res.data.data)).catch(err=>console.log(err))
    },[])

    const notifySuccess = () => {
        toast.success("Job Role added successfully");
      };

    const notifyWarning = () => {
        toast.warning("Please fill out all required fields");
      };  

    const body={
        "jobRoleId": 0,
        "jobName": jobName,
        "departmentId": depId
      }
      const handleAdd=()=>{
        setLoad(true)
        if(jobName.length ===0 || depId ===0){
            setLoad(false)
            return notifyWarning()
        }
        AddRoles(body).then(res=>{
            if(res.data.code ===200){
                notifySuccess()
                setLoad(false)
            }
        })
      }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <ToastContainer/>
        {load && <Loader/>}
    <div className="bg-white shadow-lg rounded-xl p-6 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">Add Job Role</h1>
        <div className="space-y-4">
            <input
            onChange={(e)=>setJobName(e.target.value)}
                type="text"
                placeholder="Enter Job Name"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            />{console.log(depId)}
            <select
                value={depId}
                onChange={(e) => setDepId(Number(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
                <option value="">Select department</option>
                {departments.map((dep) => (
                    <option key={dep.employmentType} value={dep.departmentId}>
                        {dep.departmentName}
                    </option>
                ))}
            </select>
            <button onClick={handleAdd} className="w-full bg-orange-500 text-white p-2 rounded hover:bg-orange-600 transition-colors">
                Add
            </button>
        </div>
    </div>
</div>

  )
}

export default AddJobRole