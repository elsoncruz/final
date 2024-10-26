import React, { useContext, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { JobOpenContext } from '../../Context/JobOpenContext';
import { AddJobOpen } from '../../Networking/JobopenApiAxios';
import Loader from '../../Components/Loader';
import { useNavigate } from 'react-router-dom';

const JobForm = () => {
  const nav = useNavigate()
  const useJobContext=useContext(JobOpenContext)
  const [jobDescriptions, setJobDescriptions] = useState([]);
  const [workModeID,setWorkModesId]=useState(0)
  const [depID,setDepID]=useState(0)
  const [empId,setEmpId]=useState(0)
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [experience, setExperience] = useState('')
  const [openings, setOpenings] = useState('')
  const [primarySkills,setPrimarySkills]=useState("")
  const [education, setEducation] = useState("")
  const [jobTiming, setJobTiming] = useState('')
  const [job,setJob]=useState([1])
  const [skillsArr,setSkillsIdArr]=useState([])
  const [jobRoleId,setJobRoleId]=useState(1)
  const [load,setLoad]=useState(false)
  
  const [validate,setValidate]=useState(false)
  const [newDescription, setNewDescription] = useState('');

  const notifySuccess = () => {
    toast.success("Job added successfully");
  };

  const notifyWarning = () => {
    toast.warning("Please fill out all required fields");
  };

  const NetworkErr=()=>{
    toast.warning("Something Went wrong!")
  }

  const bodyData = {
    "id": 0,
    "jobTitle": title,
    "imageUrl": image,
    "experienceRequired": experience,
    "workModeId": workModeID,
    "noOfOpenings": Number(openings),
    "primarySkills": primarySkills,
    "jobTiming": jobTiming,
    "jobRoleId": Number(jobRoleId),
    "departmentId":Number(depID),
    "employmentTypeId": Number(empId),
    "educationPreferred": education,
    "rolesAndResponsibilitiesRequestModelList": jobDescriptions,
    "jobOpeningKeySkillsRequestModelList": skillsArr,
    "recruiting": true
  }

  const handleAdd = () => {
    if(title.length ===0 || image.length === 0 || experience.length === 0 || workModeID ===null || openings.length ===0 || primarySkills.length ===0
      ||jobTiming.length ===0 || jobRoleId === null || depID === null || empId ===null || education.length ===0 ||jobDescriptions.length ===0||
      skillsArr.length ===0
    ){  
      notifyWarning()
      return setValidate(true)
      
    }

    notifySuccess()
    setLoad(true)
    
      AddJobOpen(bodyData).then(res=>{
        if(res.data.code===200){
            setLoad(false)
            notifySuccess()
            setDepID(0)
            setEducation('')
            setEmpId(0)
            setExperience('')
            setImage('')
            setJob(0)
        }else{
          NetworkErr()
        }
      }).catch(err=>console.log(err)).finally(()=>setTimeout(()=>{
          nav('/CareerList')
      },2000))
  }


  const addDescription = () =>{ 
    setJob([...job, `Description ${job.length +1}`])
    if(newDescription.length !==0){
      const newRole = {
      id: jobDescriptions.length,
      description: newDescription     
    };
    
    setJobDescriptions([...jobDescriptions, newRole]);
    setNewDescription('');
    }
  };

  const addSkill = (id) => {
    const NewAdd={
      id:skillsArr.length,
      keySkillsId:Number(id),
    }
    setSkillsIdArr([...skillsArr,NewAdd]) 
  };

  return (
    <div className="mx-auto p-6 pt-10 md:m-10 bg-white shadow-2xl rounded-lg">
      <h1 className="text-2xl text-[15px] md:text-[20px] font-bold text-orange-600">New Job</h1>
      {load && <Loader/>}
      <div className=" grid grid-cols-1 text-[14px] md:text-[16px] md:grid-cols-2 hide overflow-x-hidden overflow-y-scroll h-[500px] gap-6">
        <div className="space-y-4">
          <input
            type="text"
            name="jobTitle"
            placeholder="Job Title"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            className={`w-full p-3 border rounded-lg`}
          />
          { validate && title.length === 0 ? <p className="text-red-500">Job Title is required</p>:""}

          <input
            type="text"
            name="experience"
            placeholder="Experience"
            value={experience}
            onChange={(e)=>setExperience(e.target.value)}
            className={`w-full p-3 border rounded-lg `}
          />
          { validate && experience.length === 0 ? <p className="text-red-500">Experience is required</p>:""}

          <input
            type="text"
            name="openings"
            placeholder="Openings"
            value={openings}
            onChange={(e)=>setOpenings(e.target.value)}
            className={`w-full p-3 border rounded-lg $`}
          />
          {validate && openings.length ===0? <p className="text-red-500">Openings are required</p>:''}

          <input
            type="text"
            name="jobTiming"
            placeholder="Job Timing"
            value={jobTiming}
            onChange={(e)=>setJobTiming(e.target.value)}
            className={`w-full p-3 border rounded-lg `}
          />
          {validate && jobTiming.length ===0 ? <p className="text-red-500">Job Timing is required</p>:''}
          {console.log(depID)}
          <select
            name="jobRoleId"
            value={jobRoleId}
            onChange={(e)=>setJobRoleId(e.target.value)}
            className="p-2 border w-full border-gray-300 rounded"
            disabled={false}
          >
          <option value="">Select Job Role</option>
            {depID !== 0
            ? useJobContext.jobRole
            .filter((item) => item.departmentId === depID) 
            .map((i) => ( 
            <option key={i.jobRoleId} value={i.jobRoleId}>
                  {i.jobName}
           </option>
          ))
         : (
          <option value="">No Job Roles Available</option>
          )}
          </select>
          {validate && jobRoleId ===0?<p className="text-red-500">Job Role is required</p>:''}

          {job.map((_, index) => (
            <div key={index} className="flex space-x-4">
              <input
                onChange={(e)=>setNewDescription(e.target.value)}
                type="text"
                placeholder="Enter Description"
                className="flex-grow p-3 border border-gray-300 rounded-lg"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addDescription}
            className={`w-full bg-green-500 text-white p-3 rounded-lg`}
          >
            Add Description
          </button>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            name="imageURL"
            placeholder="Image URL"
            value={image}
            onChange={(e)=>setImage(e.target.value)}
            className={`w-full p-3 border rounded-lg `}
          />
          {validate && image.length ===0 ? <p className="text-red-500">Image URL is required</p>:''}

          <select
            name="workModeId"
            value={workModeID}
            onChange={(e)=>setWorkModesId(e.target.value)}
            className="p-2 border w-full border-gray-300 rounded"
          >
            <option value="">Select Work Mode</option>
            {useJobContext.workModes.map((workMode) => (
              <option key={workMode.id} value={workMode.id}>
                <h1>{workMode.workModeName}</h1>
            </option>
            ))}
          </select>
          {validate && workModeID.length ===0 ? <p className="text-red-500">Work Mode is required</p>:''}

          <input
            type="text"
            name="primarySkills"
            placeholder="Primary Skills"
            value={primarySkills}
            onChange={(e)=>setPrimarySkills(e.target.value)}
            className={`w-full p-3 border rounded-lg `}
          />
          {validate && primarySkills.length ===0 ? <p className="text-red-500">Primary Skills are required</p>:''}


          <select
             name="departmentId"
             value={depID}
              onChange={(e) => setDepID(Number(e.target.value))}
              className="p-2 border w-full border-gray-300 rounded"
              >
            <option value="">Select Department</option>
            {useJobContext.departments.map((dept) => (
            <option key={dept.departmentId} value={dept.departmentId}>
                {dept.departmentName}
             </option>
              ))}
          </select>
          {validate && depID.length ===0 ? <p className="text-red-500">Department is required</p>:''}
          <select
            name="employmentTypeId"
            value={empId}
            onChange={(e)=>setEmpId(e.target.value)}
            className="p-2 border w-full border-gray-300 rounded"
          >
            <option value="">Select Employment</option>
            {useJobContext.employmentTypes.map((emp) => (
              <option key={emp.employmentType} value={emp.id}>
                <h1>{emp.employmentType}</h1>
              </option>
            ))}
          </select>
          {validate && empId ===0 ? <p className="text-red-500">Employement required</p>:''}

          <input
            type="text"
            name="education"
            placeholder="Education Preferred"
            value={education}
            onChange={(e)=>setEducation(e.target.value)}
            className={`w-full p-3 border rounded-lg `}
          />
          { validate && education.length ===0 ? <p className="text-red-500">Education Preferred is required</p>:''}
            {console.log(skillsArr)}
      <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Skills</h1>
          <div className="flex flex-wrap gap-3">
          {useJobContext.keySkill.map((item) => (
           <button
           disabled={skillsArr.some(arr=>arr.keySkillsId === Number(item.id))}
           key={item.id}
           className={` text-[16px] ${skillsArr.some(arr=>arr.keySkillsId === Number(item.id))?' cursor-not-allowed text-white bg-red-500':'bg-gray-300'} p-2 rounded-full transition duration-200  focus:outline-none `}
           onClick={() =>{addSkill(item.id)}}
            value={item.id}
          >
            {console.log(skillsArr.includes(arr=>arr.keySkillsId === Number(item.id)))}
            {item.keySkill}
            </button>
            ))}
       </div>
      </div>
      { validate && skillsArr.length ===0 ? <p className="text-red-500">Skills is required</p>:''}

        </div>

        <div className="md:col-span-2 flex justify-end">
          <button 
          onClick={handleAdd}
          type="submit" className="bg-blue-600  text-white p-4 rounded-lg">
            Submit
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default JobForm;
