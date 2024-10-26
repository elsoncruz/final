import React, { useContext, useEffect, useState } from 'react'
import { ImImage } from 'react-icons/im';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { RiDeleteBin6Line } from "react-icons/ri";

import "react-toastify/dist/ReactToastify.css";
import { Addservicestolist, DeleteServices, GetServices } from '../../Network/ServicesApiAxios';
import Loader from '../../Components/Loader';
import { FaRegEdit } from 'react-icons/fa';
import { MdOutlinePostAdd } from 'react-icons/md';
import { JobRoleState } from '../../conText/JobRolesContext';
import { GetAllJobRole } from '../../Network/JobRoleApiAxios';
import { IoPencilSharp, IoTrashSharp } from 'react-icons/io5';



function ShowAllJob() {
    const useJobRole=useContext(JobRoleState)  
    const [addtitle,setAddtitle]=useState('')
    const [addDescription,setAddDescription]=useState('')
    const [showNew,setShowNew]=useState(false)
    const [load,setLoad]=useState(false)
    const [modal,setModal]=useState(false)
    const [hide,setHide]=useState(0)
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(()=>{
      GetAllJobRole().then(res=>useJobRole.setJobRoleList(res.data.data)).catch(err=>console.log(err.message))
    },[])
    console.log(useJobRole.jobRoleList)
  const notifysuccess = () => {
    toast.success("Add successful")
      
  }
  const notifywarning=()=>{
    toast.warning("Please enter valid details")
  }
  const notifyDelete=()=>{
    toast.success("Item Delete Successfly")
  }
  const Networkerr=()=>{
    toast.warning("Somting went wrong!")
  }
      
    const DeleteItem=(id)=>{
      setLoad(true)
        DeleteServices(id).then(res=>{if(res.data.code === 200){
           setTimeout(()=>{
            useJobRole.getJobRoles(prev=>prev.filter(item=>item.id !== id))
              setLoad(false)
          },1000)
          setModal(false)
          notifyDelete()
        }else{
            Networkerr()
        }})
     }
    return (
      <div className='h-screen overflow-auto font-Lexand'>
      {load && <Loader />}

      <div className='p-5'>
          <h1 className='text-base uppercase font-semibold'>showJobRoles</h1>
          <div className='md:flex justify-between items-center px-5 mt-4'>
              <Link to='/addVoices'><button className='mt-2 md:mt-0 px-1.5 py-1.5 uppercase text-xs font-semibold rounded-md bg-orange-400 hover:bg-orange-600'>Add Voices</button></Link>
          </div>

          <div className='px-5 mt-4'>
              <div className='hidden md:flex p-2.5 font-semibold text-xs text-center sticky top-0 border-b bg-orange-500 uppercase'>
                  {['Title', 'Description', 'Created At', 'Image', 'Action'].map((item, i) => (
                      <div key={i} className='flex-1'>{item}</div>
                  ))}
              </div>

              <div className='max-h-96 overflow-auto no-scrollbar'>
                  {useJobRole.jobRoleList.length > 0 ? (
                      useJobRole.jobRoleList.map(item => (
                          <div key={item.id} className='flex flex-col md:flex-row border-b border-gray-300'>
                              <div className='flex-1 text-start md:text-center py-1.5 md:py-3.5 font-Inter text-xs text-gray-500 md:border-none underline underline-offset-2 cursor-pointer hover:text-gray-400'><span className='md:hidden font-semibold uppercase'>Title: </span>{item.jobRoleId}</div>
                              <div title={item.jobName} className='flex-1 text-start md:text-center py-1.5 md:py-3.5 font-Inter text-xs text-gray-500 md:border-none'><span className='md:hidden font-semibold uppercase'>Description: </span>{item.description.length > 20 ? `${item.description.substring(0, 20)}...` : item.jobName}</div>
                              <div className='flex-1 text-start md:text-center py-1.5 md:py-3.5 font-Inter text-xs text-gray-500 md:border-none'><span className='md:hidden font-semibold uppercase'>Created At: </span>{item.createdAt.split(' ')[0]}</div>
                              <div className='flex-1 text-start md:text-center py-1.5 md:py-3.5 font-Inter text-xs text-gray-500 md:border-none'><span className='md:hidden font-semibold uppercase'>Image: </span>
                                  <img src={item.imageUrl} />
                              </div>
                              <div className='flex-1 flex justify-start md:justify-evenly items-center gap-2 md:gap-0 py-1.5 md:py-3.5 font-Inter text-xs text-gray-500 md:border-none'><span className='md:hidden font-semibold uppercase'>Action: </span><IoPencilSharp className='cursor-pointer'/> <IoTrashSharp className='text-red-500 cursor-pointer' /></div>
                          </div>
                      ))
                  ) : (
                      <div className='flex-1 text-center py-3 italic font-Inter font-medium text-base text-red-500'>enpy</div>
                  )}
              </div>
          </div>
      </div>

      {modal && (
          <div className={`fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center transition-opacity duration-300 ${isModalVisible ? 'opacity-100' : 'opacity-0'} bg-black bg-opacity-50`}>
              <div className={`bg-white p-6 rounded-md shadow-lg transition-transform duration-300 ${isModalVisible ? 'translate-y-0' : 'translate-y-10'}`}>
                  <p className='font-Inter font-semibold text-base text-justify'>Are you sure you want to delete this item?</p>
                  <div className='flex justify-end space-x-4 mt-4'>
                      <button className='bg-gray-300 px-3 py-2 rounded text-xs hover:bg-gray-400'>Cancel</button>
                      <button className='bg-red-500 text-white px-3 py-2 rounded text-xs hover:bg-red-600'>Delete</button>
                  </div>
              </div>
          </div>
      )}
  </div>
    )
}

export default ShowAllJob