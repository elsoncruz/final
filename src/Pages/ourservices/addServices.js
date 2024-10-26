import React, { useContext, useEffect, useState } from 'react'
import { ImImage } from 'react-icons/im';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { RiDeleteBin6Line } from "react-icons/ri";

import "react-toastify/dist/ReactToastify.css";
import { Addservicestolist, DeleteServices, GetServices } from '../../Networking/ServicesApiAxios';
import Loader from '../../Components/Loader';
import { FaRegEdit } from 'react-icons/fa';
import { MdOutlinePostAdd } from 'react-icons/md';
import { ServiceContext } from '../../Context/ServicesContext'



function Addservices() {
    const useServices=useContext(ServiceContext)  
    const [addtitle,setAddtitle]=useState('')
    const [addDescription,setAddDescription]=useState('')
    const [showNew,setShowNew]=useState(false)
    const [load,setLoad]=useState(false)
    const [conf,setConf]=useState(false)
    const [hide,setHide]=useState(0)

    useEffect(()=>{
      GetServices().then(res=>useServices.setGetServices(res.data.data)).catch(err=>console.log(err.message))
    },[])

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
      
  const handleADDSumit=()=>{
    setLoad(true)
      const add={
          "id": 0,
          "title": addtitle,
          "description": addDescription,
          "image": ''
      }
      if(addtitle.length === 0 && addDescription.length === 0){
          setLoad(false)
          return notifywarning
      }
      Addservicestolist(add).then(res=>{if(res.data.code===200){
        setTimeout(()=>{
          useServices.Ourservices(prev=>[...prev,add])
      },1000)
      setLoad(false)
      notifysuccess()
      setAddDescription('')
      setAddtitle('')
      setShowNew(false)
      }else{
        Networkerr()
      }})
  }
    const DeleteItem=(id)=>{
      setLoad(true)
        DeleteServices(id).then(res=>{if(res.data.code === 200){
           setTimeout(()=>{
              useServices.Ourservices(prev=>prev.filter(item=>item.id !== id))
              setLoad(false)
          },1000)
          setConf(false)
          notifyDelete()
        }else{
            Networkerr()
        }})
     }
    return (
      <div  className='duration-500 overflow-y-hidden'>
        <ToastContainer/>
        <h1 className='text-[min(4vh,5vw)] p-2 underline'>Our Services</h1>
        <div className='flex justify-end pr-8'>
          <button style={{backgroundImage:'linear-gradient(to right,red, orange)'}} onClick={()=>setShowNew(true)} className={`flex shadow-md hide justify-center border p-1 text-[15px] md:text-[16px] rounded-md md:p-2 sm:w-36 text-white items-center`}><MdOutlinePostAdd size={22}/> Add More..</button>
        </div>
        <div  className='w-full hide overflow-y-scroll no-scrollbar duration-500 md:p-4 pt-6 overflow-x-hidden h-[540px]'>
          
          {load ? <Loader/>:''}
          {useServices.getOurservices.length !==0?
           <div className='grid grid-cols-1 md:grid-cols-3 p-5 gap-12 items-center '>
          {useServices.getOurservices.map((ite,i)=>
          <div  className={`p-6 bg-white top-2 duration-500 shadow-2xl rounded-xl border`}>
              <div className='flex flex-col mt-4 gap-3'>
                <div className='flex justify-end'>
                   <div style={{backgroundImage:'linear-gradient(to right,red, orange)'}} className={`flex justify-between pr-0 text-[10px] md:text-[16px] duration-300 pl-0 rounded-md p-2 text-white  h-9 overflow-hidden w-9 ${conf && i === hide ?'w-[70%]':'w-9'} items-center`}>
                    <RiDeleteBin6Line onClick={()=>{setConf(true);setHide(i)}} className=' min-h-9 min-w-9 p-1 text-white rounded-md'/>you want to Delete?
                    <div className='flex'>
                      <button onClick={()=>setConf(false)} className='bg-blue-500 w-9 h-9 rounded-md text-white'>No</button>
                      <button onClick={()=>DeleteItem(ite.id)} className='bg-red-500 w-9 h-9 rounded-md text-white'>Yes</button>
                    </div>
                    </div> 
                </div>             
                <div className='sm:flex items-center justify-between'>
                  <h1 className='text-[15px] sm:text-[17px] text-gray-900 font-bold'>Titles:<br/></h1>
                  <input  value={ite.title} className='border-b-2 text-[15px] sm:text-[18px] text-gray-700 w-[85%] bg-transparent outline-none' type='text'/>
                </div>
                <div style={{backgroundImage:'linear-gradient(to right,orange, red)'}} className='flex border items-center text-white w-20 p-1  md:h-10 md:p-2 rounded-lg  md:w-28 flex-col'>
                  <input type='file' className=' absolute opacity-0 z-50' />
                  <h1 className=' flex text-[15px] md:text-[17px] items-center gap-2'><ImImage/>image</h1>
                </div>
                <div className='sm:flex flex-col'>
                  <h1 className='text-[15px] font-bold text-gray-900 sm:text-[17px]'>Description:</h1>
                 <textarea  value={ite.description} className='p-2 border w-[100%] text-gray-700 text-[15px] md:text-[16px] rounded-lg min-h-32  outline-none' type='text' placeholder='Enter description'/>
                </div>
              </div>
              <div className='flex justify-center sm:mt-7'>
                <div className='flex justify-center flex-col'>
                  <h1 className='flex items-center text-[13px] sm:text-[14px] text-yellow-500'>Notes:Changes made in the Admin Dashboard will directly reflect on the main website.</h1>
                  <div className='flex pt-2 gap-2 justify-center'>
                  <Link to='/UpdateServices' style={{backgroundImage:'linear-gradient(to right,orange, yellow)'}} onClick={()=>{useServices.setDescription(ite.description);useServices.setTitle(ite.title);useServices.setId(ite.id)}} className={`flex justify-center w-24 md:w-32 text-[15px] md:text-[16px] md:p-2 p-1 border shadow-md text-white rounded-lg items-center`}><FaRegEdit size={22}/>Edit</Link>                   
                  </div>
                </div>   
              </div>
            </div>
            )}
            <div className={`p-6 sticky ${showNew?' translate-x-0':' hidden'} p-2 bg-white duration-500 shadow-current rounded-xl border`}>
              <div className='flex flex-col mt-4  gap-3'>
              <div className='sm:flex items-center justify-between'>
              <h1 className='text-[15px] sm:text-[18px] text-gray-900 font-bold'>Titles:<br/></h1>
                  <input onChange={(e)=>setAddtitle(e.target.value)} value={addtitle} className='border-b-2 text-[15px] sm:text-[18px] text-gray-700 w-[90%] bg-transparent outline-none' type='text' placeholder={`Enter New title ...`}/>
                </div>
                <div style={{backgroundImage:'linear-gradient(to right,orange, red)'}} className='flex border items-center text-white w-20 p-1  md:h-10 md:p-2 rounded-lg  md:w-28 flex-col'>
                  <input type='file' className=' absolute opacity-0 z-50' />
                  <h1 className=' flex text-[15px] md:text-[18px] items-center gap-2'><ImImage/>image</h1>
                </div>
                <div className='sm:flex flex-col'>
                  <h1 className='text-[15px] text-gray-900 font-bold md:text-[18px]'>Description:</h1>
                 <textarea onChange={(e)=>setAddDescription(e.target.value)} value={addDescription} className='p-2 border w-[100%] text-gray-700 text-[15px] md:text-[18px] rounded-lg min-h-32  outline-none' type='text' placeholder='Enter New description ....'/>                 
                </div>
              </div>
              <div className='flex justify-center sm:mt-7'>
                <div className='flex justify-center flex-col'>
                  <h1 className='flex items-center text-[13px] sm:text-[15px] text-yellow-500'>Notes:Changes made in the Admin Dashboard will directly reflect on the main website.</h1>
                  <div className='flex  justify-center mt-2'>       
                    <button style={{backgroundImage:'linear-gradient(to right,red, orange)'}} onClick={()=>handleADDSumit()} className='flex justify-center p-2 rounded-2xl text-white h-7 sm:h-10 sm:w-36 items-center'>Submit</button>
                  </div>
                </div>   
              </div>
            </div>
        </div> :<Loader/>
} 
        </div> 
      </div>
    )
}

export default Addservices