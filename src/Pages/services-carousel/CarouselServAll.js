import React, { useContext, useEffect, useState } from 'react'
import { ImImage } from 'react-icons/im';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { RiDeleteBin6Line } from "react-icons/ri";

import "react-toastify/dist/ReactToastify.css";
import { AddCarouselServices, DeleteCarousel, GetCarouselsev, } from '../../Networking/CarouselApiAxios';
import Loader from '../../Components/Loader';
import { FaRegEdit } from 'react-icons/fa';
import { MdOutlinePostAdd } from 'react-icons/md';
import { FaXmark } from 'react-icons/fa6';
import { CarouselContext } from '../../Context/CarouselContext';



function CarouselServices() {
  const useCarousel=useContext(CarouselContext)  
  const [addtitle,setAddtitle]=useState('')
  const [addDescription,setAddDescription]=useState('')
  const [showNew,setShowNew]=useState(false)
  const [load,setLoad]=useState(false)
  const [conf,setConf]=useState(false)
  const [hide,setHide]=useState(0)

  
useEffect(()=>{
    GetCarouselsev().then(res=>useCarousel.setCarouselItem(res.data.data)).catch(err=>console.log(err))
},[])

  const notifysuccess = () => {
    toast.success("Add successful");
      
  };
  const notifywarning=()=>{
    toast.warning("Please enter valid details")
  }
  const notifyDelete=()=>{
    toast.success("Delete Successfly")
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
        setLoad(true)
        return notifywarning()
    }
    AddCarouselServices(add).then(res=>{if(res.data.code ===200){
      setTimeout(()=>{
          useCarousel.ServicesCarousel(prev=>[...prev,add])
          notifysuccess()
      },1000)
      setLoad(false)
      setAddDescription('')
      setAddtitle('')
      setShowNew(false)
    }else{
        Networkerr()
    }}).catch(err=>console.log(err))
      
      }
    const DeleteItem=(id)=>{
      setLoad(true)
      DeleteCarousel(id).then(res=>{
      if(res=>res.data.code === 200){
           setTimeout(()=>{
               useCarousel.ServicesCarousel(prev=>prev.filter(item=>item.id !== id))
           },1000)
           setLoad(false)
          setConf(false)
          notifyDelete()
        }else{
          Networkerr()
        }})
     }

    return (
      <div  className='duration-500 overflow-y-hidden'>
        <ToastContainer/>
        <h1 className='text-[min(4vh,5vw)] p-2 underline'>CarouselServices</h1>
        <div className='flex justify-end pr-8'>
            <button style={{backgroundImage:'linear-gradient(to right,red, orange)'}} onClick={()=>setShowNew(true)} className={`flex shadow-md justify-center border p-1 text-[15px] md:text-[16px] rounded-md md:p-2 sm:w-36 text-white items-center`}><MdOutlinePostAdd size={25}/> Add More..</button>
          </div>
        <div  className='w-full no-scrollbar overflow-y-scroll duration-500 md:p-4 pt-6 overflow-x-hidden h-[540px]'>
          
          {load ? <Loader/>:''}
          {useCarousel.getCarouselItem.length !==0?
           <div className='grid grid-cols-1 md:grid-cols-3  gap-12 items-center '>
          {useCarousel.getCarouselItem.map((ite,i)=>
          <div className={`p-6 bg-white duration-300 hover:shadow-2xl overflow-hidden  rounded-xl border`}>
              <div className='flex flex-col mt-4 gap-3'>
                <div className='flex justify-end'>
                   <div style={{backgroundImage:'linear-gradient(to right,red, orange)'}} className={`flex justify-between pr-0 text-[10px] md:text-[15px] duration-300 border pl-0 rounded-md p-2 text-white  h-9 overflow-hidden w-9 ${conf && i === hide ?'w-[65%]':'w-9'} items-center`}>
                    <RiDeleteBin6Line onClick={()=>{setConf(true);setHide(i)}} className=' min-h-9 min-w-9 p-1 text-white rounded-md'/>you want to Delete?
                    <div className='flex'>
                      <button onClick={()=>setConf(false)} className='bg-blue-500 w-9 h-9 rounded-md text-white'>No</button>
                      <button onClick={()=>DeleteItem(ite.id)} className='bg-red-500 w-9 h-9 rounded-md text-white'>Yes</button>
                    </div>
                    </div> 
                </div>
                <div className='sm:flex items-center justify-between'>
                  <h1 className='text-[15px] sm:text-[17px] text-gray-900 font-bold'>Titles:<br/></h1>
                  <input  value={ite.title} className='border-b-2 text-[15px] sm:text-[16px] text-gray-700 w-[85%] bg-transparent outline-none' type='text'/>
                </div>
                <div style={{backgroundImage:'linear-gradient(to right,orange, red)'}} className='flex border items-center text-white w-20 p-1  md:h-10 md:p-2 rounded-lg  md:w-28 flex-col'>
                  <input type='file' className=' absolute opacity-0 z-50' />
                  <h1 className=' flex text-[15px] md:text-[16px] items-center gap-2'><ImImage/>image</h1>
                </div>
                <div className='sm:flex flex-col'>
                  <h1 className='text-[15px] font-bold text-gray-900 sm:text-[17px]'>Description:</h1>
                 <textarea  value={ite.description} className='p-2 border  no-scrollbar w-[100%] text-gray-700 text-[15px] md:text-[16px] rounded-lg min-h-32  outline-none' type='text' placeholder='Enter description'/>
                </div>
              </div>
              <div className='flex justify-center sm:mt-7'>
                <div className='flex justify-center flex-col'>
                  <h1 className='flex items-center text-[13px] sm:text-[15px] text-yellow-500'>Notes:Changes made in the Admin Dashboard will directly reflect on the main website.</h1>
                  <div className='flex pt-2 gap-2 justify-center'>
                  <Link to='/UpdateCarousel' style={{backgroundImage:'linear-gradient(to right,orange, yellow)'}} onClick={()=>{useCarousel.setCarouselDescription(ite.description);useCarousel.setCarouselTitle(ite.title);useCarousel.setCarouselId(ite.id)}} className={`flex justify-center w-24 md:w-32 text-[15px] md:text-[16px] md:p-2 p-1 border shadow-md text-white rounded-lg items-center`}><FaRegEdit size={25}/>Edit</Link> 
                  </div>
                </div>   
              </div>
            </div>
            )}
            <div className={`p-6 ${showNew?'':' hidden'} p-2 hover:shadow-2xl bg-white duration-3 w-[90%] md:w-[450px] rounded-xl border`}>
              <div className='flex flex-col mt-4  gap-3'>
              <div className='flex justify-end'>
                   <FaXmark onClick={()=>setShowNew(false)} style={{backgroundImage:'linear-gradient(to right,red, orange)'}} className='border-2 min-h-9 min-w-9 p-1 text-white rounded-md'/>
                </div>
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

export default CarouselServices