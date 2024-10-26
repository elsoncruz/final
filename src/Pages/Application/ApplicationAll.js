import React, { useContext, useState } from 'react'
import { ApplicationDelete, UpdateApplicationList } from '../../Networking/ApplicationApiAxios'
import { MdDeleteForever } from "react-icons/md";
import { FaXmark } from 'react-icons/fa6';
import Loader from '../../Components/Loader';
import { BiEdit } from 'react-icons/bi';
import { toast, ToastContainer } from 'react-toastify';
import { AppContext } from '../../Context/ApplicationContext';


    

function ApplicationAll() {
const useAppContext = useContext(AppContext)
    const [confirm,setConfirm]=useState(false)
    const [id,setId]=useState(0)
    const [appUpId,setAppUpId]=useState(0)
    const [load,setLoad]=useState(false)
    const [goEdit,setGoEdit]=useState(false)

    const NetworkErr=()=>{
      toast.warning("Something Went wrong!")
    }
    const handleRemove=(deleteId)=>{
      setConfirm(true) 
      setId(deleteId) 
    }
    const appUpdateList=(upId,id2)=>{
      setLoad(true)
       UpdateApplicationList(upId,id2).then(res=>{
      if(res=>res.data.code ===200){
        useAppContext.ApplicationData();
        setTimeout(()=>{
           setLoad(false)
        },1000)
        console.log("work")
      }else{
        NetworkErr()
      }})
        
    }
    const deleteLoad=()=>{
        console.log(id)
        setLoad(true)
        const response = ApplicationDelete(id)
          if(response.then(res=>res.data.code === 200)){
             setTimeout(()=>{
                useAppContext.ApplicationData();
                setLoad(false)
             },1000)
          }else{
            NetworkErr()
      }
    }

  return (
    <div className='duration-500 h-[90vh] w-full'>
       <ToastContainer/>
      <h1 className='text-[min(4vh,5vw)] text-orange-600 p-3 underline'>All voices of Eloiacs</h1>
      <div  style={{fontFamily:'Lexend'}} className={`${confirm?'':'hidden'} text-[15p]  absolute min-w-60 max-w-[500px] bg-white xl:p-6 p-1 top-[120px] xl:top-[200px] xl:h-auto border shadow-2xl z-0 rounded-xl m-1 xl:right-[500px] right-[min(800px,10px)]`}>
      <div className='flex justify-end'>
        <FaXmark onClick={()=>setConfirm(false)} className=' cursor-pointer xl:text-[25px] text-[18px] text-gray-500'/>
      </div>
      <div className='flex justify-center'>
        <MdDeleteForever  className='text-gray-500 xl:text-[40px] text-[30px]  flex justify-center'/>
      </div>
      <div className='flex flex-col p-3  gap-2 justify-center '> 
        <h1 className='flex justify-center text-[12px] xl:text-[18px] text-gray-500'>Are you sure you want to delete this ID:{id} item?</h1>
        <div className='flex justify-center text-[15px] gap-4'>
            <button onClick={()=>setConfirm(false)} className='bg-white xl:p-2 text-[12px] xl:text-[17px] xl:w-32 border rounded-xl'>No,cancel</button>
            <button onClick={()=>{setConfirm(false);deleteLoad()}} className='p-2 xl:w-32 text-[12px] xl:text-[17px] text-white bg-red-500 rounded-xl'>Yes,i'm sure</button>
        </div>
      </div>
      </div>
      
      <div  style={{fontFamily:'Lexend'}} className={`${goEdit?'':'hidden'} text-[15p]  absolute min-w-60 max-w-[500px] bg-white xl:p-6 p-1 top-[120px] xl:top-[200px] xl:h-auto border shadow-2xl z-0 rounded-xl m-1 xl:right-[500px] right-[min(800px,10px)]`}>
      <div className='flex justify-between'>
      <h1 className='flex font-bold justify-start'>ApplicationStatus ID:{appUpId}</h1>
        <FaXmark onClick={()=>setGoEdit(false)} className=' cursor-pointer xl:text-[25px] text-[18px] text-gray-500'/>
      </div>
      <div className='p-2 w-96'>
        
        {useAppContext.appStatus.map((item,i)=><div className=' justify-center  gap-4 p-1'>
          <h1 onClick={()=>{appUpdateList(item.id,appUpId);setGoEdit(false)}} className='bg-orange-400 cursor-pointer text-white hover:shadow-lg flex justify-center p-2 rounded-xl'>{item.applicationStatusName}</h1>
        </div>)}
      </div>
      </div>
      {load && <Loader/>}
      <div className='flex flex-col xl:pr-10 xl:pl-10 justify-center'>
        <div className='xl:grid hidden font-bold bg-orange-600 grid-cols-11 text-[15px] p-5 gap-12'>
                    <h1 className='justify-center flex items-center'>Id</h1>
                    <h1 className='justify-center flex items-center'>Name</h1>
                    <h1 className='justify-center flex items-center'>Email</h1>
                    <h1 className='justify-center flex items-center'>Mobile No</h1>
                    <h1 className='justify-center flex items-center'>Role</h1>
                    <h1 className='justify-center flex items-center'>Resume</h1>
                    <h1 className='justify-center flex items-center'>WorkStatus</h1>
                    <h1 className='justify-center flex items-center'>Status</h1>
                    <h1 className='justify-center flex items-center'>experience</h1>  
                    <h1 className='justify-center flex items-center'>created At</h1>
                    <h1 className='justify-center flex items-center'>Action</h1>
          </div>   
          <div className='border hide overflow-y-scroll no-scrollbar overflow-x-hidden h-[80vh] md:h-[70vh]'>
            {useAppContext.getApplication.length !==0 ? useAppContext.getApplication.map((item,i)=>
            <div key={i} className={`${i % 2 ===0?'bg-gray-50':''} border-gray-200 grid grid-cols-1 xl:grid-cols-11 m-1 p-6 xl:p-1 text-[13px] xl:text-[15px] min-h-20 text-gray-500 duration-500 gap-2 xl:gap-4`}>
                <h1 key={i} className='xl:justify-center flex gap-1 items-center'><h1 className='xl:hidden text-gray-700 font-bold'>Id:</h1>{item.id}</h1>
                <h1 className='xl:justify-center flex gap-1 items-center'><h1 className='xl:hidden text-gray-700 font-bold'>Title:</h1>{item.name}</h1>
                <h1 className='xl:hidden text-gray-700 font-bold'>Description:</h1> 
                <h1 className='xl:justify-center flex gap-11 xl:w-36 items-center p-1'>{item.email.slice(0,-9)}</h1>
                <h1 className='xl:justify-center flex w-72 xl:w-32 gap-1 items-center'><h1 className='xl:hidden text-gray-700 font-bold'>ImageText:</h1> {item.mobileNumber}</h1>
                <h1 className='xl:justify-center flex gap-1 items-center'><h1 className='xl:hidden text-gray-700 font-bold'>CreatedBy:</h1>{item.jobRoleName}</h1>
                <a href={item.resumePath} target='_blank' rel='noopener noreferrer' className='xl:justify-center flex text-blue-500 underline gap-1 items-center'><h1 className='xl:hidden text-gray-700 font-bold'>ModifyCount:</h1>Link</a>
                <h1 className='xl:justify-center flex gap-1 items-center'><h1 className='xl:hidden text-gray-700 font-bold'>ModifiedBy:</h1>{item.workStatusName}</h1>
                <h1 className='xl:justify-center flex gap-1 xl:pl-5 items-center'><h1 className='xl:hidden text-gray-700 font-bold'>CreatedAt:</h1>{item.applicationStatusName}</h1>
                <h1 className='xl:justify-center flex gap-1 xl:pl-5 items-center'><h1 className='xl:hidden text-gray-700 font-bold'>ModifiedAt:</h1>{item.experience}</h1>
                <h1 className='xl:justify-center flex gap-1 xl:pl-5 items-center'><h1 className='xl:hidden text-gray-700 font-bold'>ModifiedAt:</h1>{item.createdAt.slice(0,10)}</h1>
                <div className='gap-4 justify-center flex items-center'>
                  <button onClick={()=>{setGoEdit(true);setAppUpId(item.id)}}><BiEdit size={25}/></button>
                    <button onClick={()=>handleRemove(item.id) 
                    } className='text-red-500'><MdDeleteForever size={25} /></button> 
                </div>
            </div>):<Loader/>}
            </div> 
      </div>  
    </div>
  )
}

export default ApplicationAll