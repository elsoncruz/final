import React, { useContext, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import { UpdateServices } from '../../Networking/ServicesApiAxios';
import { ImImage } from 'react-icons/im';
import Loader from '../../Components/Loader';
import { useNavigate } from 'react-router-dom';
import { ServiceContext } from '../../Context/ServicesContext';

function UpdateServiceslist() {
  const nav = useNavigate()
  const UseEdit=useContext(ServiceContext)
  const [upid]=useState(UseEdit.id)
  const [Uptitle, setTitle] = useState(UseEdit.title)
  const [Upsubtitle, setSubTitle] = useState(UseEdit.description)
  const [load,setLoad]=useState(false)
  const notify = () => {
    toast.success("Add successful");

  };
  const notifywarning = () => {
    toast.warning("Please enter values")
  };
  const Networkerr=()=>{
    toast.warning("Somting went wrong!")
  }

  const data = {
    "id":upid,
    "title": Uptitle,
    "description": Upsubtitle,
    "image": '',
  }
  const handleSumit = () => {
    setLoad(true)
    if (Uptitle.length === 0 && Upsubtitle.length === 0) {
      return notifywarning()
    }
    UpdateServices(data).then(res=>{
      if(res.data.code ===200){
        setTimeout(()=>{
      UseEdit.Ourservices((prev) =>[prev.map((item) => {
          if (item.id === upid) {
            return {
              ...item,
              title: Uptitle,
              description: Upsubtitle,
            }
          }
          return item;
        })]
      )
        notify()
    },1000)
      }else{
          Networkerr()
      }
    }).catch(err=>console.log(err)).finally(()=>setLoad(false))
    setTimeout(()=>{
      nav('/addservices')
    },2000)
  }
  return (
    <div className='flex items-center min-h-screen justify-center '>
      <ToastContainer/>
      {load && <Loader/>}
      <div className={` p-2  bg-white duration-500 shadow-2xl w-[90%] md:w-[800px] rounded-xl border`}>
    <div className='flex flex-col mt-4  gap-3'>
    <div className='sm:flex items-center justify-between'>
    <h1 className='text-[15px] sm:text-[18px] text-gray-900 font-bold'>Titles:<br/></h1>
        <input onChange={(e)=>setTitle(e.target.value)} value={Uptitle} className='border-b-2 text-[15px] sm:text-[18px] text-gray-700 w-[90%] bg-transparent outline-none' type='text' placeholder={`Enter title ...`}/>
      </div>
      <div style={{backgroundImage:'linear-gradient(to right,orange, red)'}} className='flex border items-center text-white w-20 p-1  md:h-10 md:p-2 rounded-lg  md:w-28 flex-col'>
        <input type='file' className=' absolute opacity-0 z-50' />
        <h1 className=' flex text-[15px] md:text-[18px] items-center gap-2'><ImImage/>image</h1>
      </div>
      <div className='sm:flex flex-col'>
        <h1 className='text-[15px] text-gray-900 font-bold md:text-[18px]'>Description:</h1>
       <textarea onChange={(e)=>setSubTitle(e.target.value)} value={Upsubtitle} className='p-2 border w-[100%] text-gray-700 text-[15px] md:text-[18px] rounded-lg min-h-32  outline-none' type='text' placeholder='Enter description ....'/>       
      </div>
    </div>
    <div className='flex justify-center sm:mt-7'>
      <div className='flex justify-center flex-col'>
        <h1 className='flex items-center text-[13px] sm:text-[15px] text-yellow-500'>Notes:Changes made in the Admin Dashboard will directly reflect on the main website.</h1>
        <div className='flex  justify-center mt-2'>
          <button style={{backgroundImage:'linear-gradient(to right,red, orange)'}} onClick={()=>handleSumit()} className='flex justify-center p-2 rounded-2xl text-white h-7 sm:h-10 sm:w-36 items-center'>Update</button>
        </div>
      </div>   
    </div>
  </div>
</div>
  )
}

export default UpdateServiceslist



