import {React, useState} from 'react';
import { toast } from 'react-toastify';
import { setUpCookie } from '../../Utils/Cookie';
import { TOKEN } from '../../Utils/Constant';
import { useLocation, useNavigate } from 'react-router-dom';
import {UpdateDepartmentApi} from '../../Networking/DepartmentApiAction'
import Loader from '../../Components/Loader';

const UpdateDepartment = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const {departmentId, departmentName } = location.state || {}
    const [addDepartment, setAddDepartment] = useState(departmentName)
    const [loader, setLoader] = useState(false) 
    const [errors, setErrors] = useState(false)

    const validateForm = () => {
      let formErrors = {};
      if (!addDepartment) {
          formErrors.departmentName = "Department  is required.";
      } 
      setErrors(formErrors);
      return Object.keys(formErrors).length === 0;
    }

    const handleChange = (e) => {
        setAddDepartment(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!validateForm()) return; 
        const data = {
            departmentId: departmentId,
            departmentName : addDepartment
        }
        setLoader(true)   
        UpdateDepartmentApi(data).then((response) => {         
      if(response.data.code === 200) {
        if (response.data.accessToken) setUpCookie(TOKEN, response.data.accessToken);
        setLoader(false)
        setAddDepartment('')
        toast.success(response.data.message)
        navigate('/getDepartment')
        console.log('data', response.data.data)
      }
      else {
        setLoader(false)
        toast.error(response.data.message)
      }
    })
    }
 
  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-300'>
      {loader && <Loader />}
      <div className='w-full max-w-md px-12 py-5 space-y-4 bg-white rounded-lg shadow-md'>
        <p className='text-orange-500 text-2xl tracking-wider text-center mb-12'><span className='border-b border-b-gray-300' >Update Department</span></p>
        <div className='flex gap-5 items-center'>
          <label className='text-nowrap'> Department Name:</label>
          <input className='border border-gray-500 p-2 outline-none' type='text' onChange={handleChange} value={addDepartment} />
        </div>  
        {errors.departmentName && <p className='text-xs text-red-600'>{errors.departmentName}</p>}
        <div className='flex justify-center'>   
          <button className='w-1/2 px-4 py-2 mt-10 text-white bg-orange-500 rounded-md hover:bg-orange-600 flex justify-center' type='submit' onClick={handleSubmit} >Update</button>
        </div>
      </div>
    </div>
  );
}
export default UpdateDepartment;
