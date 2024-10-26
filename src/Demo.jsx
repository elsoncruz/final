import { useState, useEffect } from 'react'; 
import { WorkMode } from '../../Networking/WorkMode';
import {JobRollId} from "../../Networking/GetAllJobRoll"

const JobForm = () => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    imageUrl: '',
    experience: '',
    workModeId: '',
    openings: '',
    primarySkills: '',
    jobTiming: '',
    jobRoleId: '',
    departmentId: '',
    employmentTypeId: '',
    educationPreferred: '',
    descriptions: [''], 
    skills: ['']
  });

  const [errors, setErrors] = useState({});
  const [workModes, setWorkModes] = useState([]);
  const [jobRolls, setJobRolls] = useState([]);

  useEffect(() => {

    WorkMode()
      .then(res => {
        setWorkModes(res.data.data); 
        console.log(res.data)
      })
      .catch(err => {
        console.error("Error fetching work modes:", err);
      });
  }, []);

  useEffect(()=>{
    JobRollId()
    .then(res => {
     setJobRolls(res.data.data)
     console.log(res.data);
    })
    .catch(err => {
      console.error("Error fetching job rolls:", err);
      });
  },[])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };


  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  //   setErrors({ ...errors, [name]: '' }); 
  // };

  const handleDescriptionChange = (index, value) => {
    const newDescriptions = [...formData.descriptions];
    newDescriptions[index] = value;
    setFormData({ ...formData, descriptions: newDescriptions });
    setErrors({ ...errors, [`description${index}`]: '' }); 
  };

  const handleSkillChange = (index, value) => {
    const newSkills = [...formData.skills];
    newSkills[index] = value;
    setFormData({ ...formData, skills: newSkills });
    setErrors({ ...errors, [`skill${index}`]: '' }); 
  };

  const addDescription = () => {
    setFormData({ ...formData, descriptions: [...formData.descriptions, ''] });
  };

  const addSkill = () => {
    setFormData({ ...formData, skills: [...formData.skills, ''] });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.jobTitle) newErrors.jobTitle = 'Job Title is required';
    if (!formData.imageUrl) newErrors.imageUrl = 'Image URL is required';
    if (!formData.experience) newErrors.experience = 'Experience is required';
    if (!formData.workModeId) newErrors.workModeId = 'Work Mode ID is required';
    if (!formData.openings) newErrors.openings = 'Number of Openings is required';
    if (!formData.primarySkills) newErrors.primarySkills = 'Primary Skills are required';
    if (!formData.jobTiming) newErrors.jobTiming = 'Job Timing is required';
    if (!formData.jobRoleId) newErrors.jobRoleId = 'Job Role ID is required';
    if (!formData.departmentId) newErrors.departmentId = 'Department ID is required';
    if (!formData.employmentTypeId) newErrors.employmentTypeId = 'Employment Type ID is required';
    if (!formData.educationPreferred) newErrors.educationPreferred = 'Education Preferred is required';

   
    formData.descriptions.forEach((desc, index) => {
      if (!desc) newErrors[`description${index}`] = `Description ${index + 1} is required`;
    });

   
    formData.skills.forEach((skill, index) => {
      if (!skill) newErrors[`skill${index}`] = `Skill ${index + 1} is required`;
    });

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      alert('Form submitted successfully');
      console.log(formData);
    } else {
      setErrors(newErrors);
    }
  };

  const removeDescription = (index) => {
    setFormData((prevData) => {
      const updatedDescriptions = prevData.descriptions.filter((_, i) => i !== index);
      return { ...prevData, descriptions: updatedDescriptions };
    });
  };

  const removeSkill = (index) => {
    setFormData((prevData) => {
      const updatedSkills = prevData.skills.filter((_, i) => i !== index);
      return { ...prevData, skills: updatedSkills };
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen p-7">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-orange-500">New Job</h1>
        <div onSubmit={handleSubmit} className="grid grid-cols-1 h-[550px] no-scrollbar px-2 overflow-auto md:grid-cols-2 gap-6">
          
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Job Title <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 outline-none"
              placeholder="Job Title"
            />
            {errors.jobTitle && <span className="text-red-500 text-sm">{errors.jobTitle}</span>}
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Image URL <span className="text-red-500">*</span></label>
            <input
              type="text" 
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 outline-none"
              placeholder="Image URL"
            />
            {errors.imageUrl && <span className="text-red-500 text-sm">{errors.imageUrl}</span>}
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Experience Required <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 outline-none"
              placeholder="Experience"
            />
            {errors.experience && <span className="text-red-500 text-sm">{errors.experience}</span>}
          </div>

          <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">
          Work Mode <span className="text-red-500">*</span>
        </label>
        <select
          name="workModeId"
          value={formData.workModeId}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 outline-none"
        >
          <option value="">Select Work Mode</option>
          {workModes.map((workMode) => (
            <option key={workMode.id} value={workMode.id}>
              {workMode.workModeName}
            </option>
          ))}
        </select>
        {errors.workModeId && (
          <span className="text-red-500 text-sm">{errors.workModeId}</span>
        )}
      </div>


          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Number of Openings <span className="text-red-500">*</span></label>
            <input
              type="number"
              name="openings"
              value={formData.openings}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 outline-none"
              placeholder="Number of Openings"
            />
            {errors.openings && <span className="text-red-500 text-sm">{errors.openings}</span>}
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Primary Skills <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="primarySkills"
              value={formData.primarySkills}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 outline-none"
              placeholder="Primary Skills"
            />
            {errors.primarySkills && <span className="text-red-500 text-sm">{errors.primarySkills}</span>}
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Job Timing <span className="text-red-500">*</span></label>
            <input
              type="time"
              name="jobTiming"
              value={formData.jobTiming}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 outline-none"
            />
            {errors.jobTiming && <span className="text-red-500 text-sm">{errors.jobTiming}</span>}
          </div>

          <div className="flex flex-col">
  <label className="text-sm font-medium mb-1">
    Job Role ID <span className="text-red-500">*</span>
  </label>
  <select
    name="jobRoleId"
    value={formData.jobRoleId}
    onChange={handleChange}
    className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 outline-none"
  >
   <option >Select Job Roll Id</option>
   {JobRollId.map((JobRollId) => (
    <option key={JobRollId.id} value={JobRollId}>
      {JobRollId.jobName}
    </option>
   ))}
  </select>
  {errors.jobRoleId && 
  <span className="text-red-500 text-sm">{errors.jobRoleId}</span>}
</div>


          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Department ID <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="departmentId"
              value={formData.departmentId}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 outline-none"
              placeholder="Department ID"
            />
            {errors.departmentId && <span className="text-red-500 text-sm">{errors.departmentId}</span>}
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Employment Type ID <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="employmentTypeId"
              value={formData.employmentTypeId}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 outline-none"
              placeholder="Employment Type ID"
            />
            {errors.employmentTypeId && <span className="text-red-500 text-sm">{errors.employmentTypeId}</span>}
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Education Preferred <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="educationPreferred"
              value={formData.educationPreferred}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 outline-none"
              placeholder="Education Preferred"
            />
            {errors.educationPreferred && <span className="text-red-500 text-sm">{errors.educationPreferred}</span>}
          </div>

          <div className="flex flex-col ">
            <label className="text-sm font-medium mb-1">Skills <span className="text-red-500">*</span></label>
            {formData.skills.map((skill, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={skill}
                  onChange={(e) => handleSkillChange(index, e.target.value)}
                  className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 outline-none flex-grow"
                  placeholder={`Skill ${index + 1}`}
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeSkill(index)}
                    className="ml-2 bg-red-500 text-white rounded px-3 py-1"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addSkill}
              className="mt-2 bg-gray-800 text-white rounded px-4 py-2"
            >
              Add Skill
            </button>
            {Object.keys(errors).filter((key) => key.startsWith('skill')).map((key, index) => (
              <span key={index} className="text-red-500 text-sm">{errors[key]}</span>
            ))}
          </div>
          
          
          <div className="flex flex-col col-span-2">
            <label className="text-sm font-medium mb-1">Job Descriptions <span className="text-red-500">*</span></label>
            {formData.descriptions.map((description, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={description}
                  onChange={(e) => handleDescriptionChange(index, e.target.value)}
                  className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 outline-none flex-grow"
                  placeholder={`Description ${index + 1}`}
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeDescription(index)}
                    className="ml-2 bg-red-500 text-white rounded px-3 py-1"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addDescription}
              className="mt-2 bg-gray-800 text-white rounded px-4 py-2"
            >
              Add Description
            </button>
            {Object.keys(errors).filter((key) => key.startsWith('description')).map((key, index) => (
              <span key={index} className="text-red-500 text-sm">{errors[key]}</span>
            ))}
          </div>

         
         

          <button
            type="submit"
            className="col-span-2 mt-4 bg-orange-500 text-white rounded px-4 py-2"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobForm;
