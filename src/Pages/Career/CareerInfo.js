import React, { useEffect, useState } from 'react'
import { CareerInfo } from '../../Networking/CareerinfoApiAxios';
import Loader from '../../Components/Loader';

function Career() {
const [careerList,setCareerList]=useState([])

useEffect(()=>{
    CareerInfo().then(res=>setCareerList(res.data.data)).catch(err=>console.log(err))
},[])
  return (
    <div className='duration-500 h-[90vh] w-full'>
      <h1 className='text-[min(4vh,5vw)] text-orange-600 p-3 underline'>Career-Info</h1>
      <div className='flex flex-col xl:pr-10 xl:pl-10 justify-center'>
        <div className='xl:grid hidden font-bold bg-orange-600 grid-cols-10  text-[15px] p-5 gap-12'>
                    <h1 className='justify-center flex items-center'>Id</h1>
                    <h1 className='justify-center flex items-center'>Name</h1>
                    <h1 className='justify-center flex items-center'>Email</h1>
                    <h1 className='justify-center flex items-center'>Gender</h1>
                    <h1 className='justify-center flex items-center'>Mobile No</h1>
                    <h1 className='justify-center flex items-center'>City</h1>
                    <h1 className='justify-center flex items-center'>Education</h1>
                    <h1 className='justify-center flex items-center'>Resume</h1>
                    <h1 className='justify-center flex items-center'>Created At</h1>  
                    <h1 className='justify-center flex items-center'>Modified At</h1>
          </div>   
          <div className='border no-scrollbar overflow-y-scroll overflow-x-hidden h-[80vh] md:h-[70vh]'>
            {careerList.length !==0 ? careerList.map((item,i)=>
            <div key={i} className={`${i % 2 ===0?'bg-gray-50':''} border-gray-200 grid grid-cols-1 xl:grid-cols-10 m-1 p-6 xl:p-1 text-[13px] xl:text-[15px] min-h-20 text-gray-500 duration-500 gap-2 xl:gap-4`}>
                <h1 key={i} className='xl:justify-center flex gap-1 items-center'><h1 className='xl:hidden text-gray-700 font-bold'>Id:</h1>{item.id}</h1>
                <h1 className='xl:justify-center flex gap-1 items-center'><h1 className='xl:hidden text-gray-700 font-bold'>Name:</h1>{item.name}</h1>
                <h1 className='xl:justify-center flex gap-1 xl:w-36 items-center p-1'><h1 className='xl:hidden text-gray-700 font-bold'>Email:</h1>{item.email.slice(0,-9)}</h1>
                <h1 className='xl:justify-center flex w-72 xl:w-32 gap-1 items-center'><h1 className='xl:hidden text-gray-700 font-bold'>Gender:</h1>{item.gender.length !==0?item.gender === 1?"Male":"Female":"Not Specify"}</h1>
                <h1 className='xl:justify-center flex gap-1 items-center'><h1 className='xl:hidden text-gray-700 font-bold'>CreatedBy:</h1>{item.mobileNumber}</h1>
                <h1 className='xl:justify-center flex gap-1 items-center'><h1 className='xl:hidden text-gray-700 font-bold'>ModifyCount:</h1>{item.city}</h1>
                <h1 className='xl:justify-center flex gap-1 items-center'><h1 className='xl:hidden text-gray-700 font-bold'>ModifiedBy:</h1>{item.education}</h1>
                <a href={item.resumePath} target='_black' className='xl:justify-center text-blue-500 underline flex gap-1 items-center'><h1 className='xl:hidden text-gray-700 font-bold'>ModifiedBy:</h1>Link</a>
                <h1 className='xl:justify-center flex gap-1 xl:pl-5 items-center'><h1 className='xl:hidden text-gray-700 font-bold'>CreatedAt:</h1>{item.createdAt.slice(0,10)}</h1>
                <h1 className='xl:justify-center flex gap-1 xl:pl-5 items-center'><h1 className='xl:hidden text-gray-700 font-bold'>ModifiedAt:</h1>{item.modifiedAt.slice(0,10)}</h1>
            </div>):<Loader/>}
            </div> 
      </div>  
    </div>
  )
}

export default Career