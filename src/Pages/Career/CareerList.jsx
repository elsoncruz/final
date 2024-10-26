import React, { useContext, useEffect, useState } from 'react';
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { TOKEN } from '../../Utils/Constant';
import { toast } from 'react-toastify';
import { setUpCookie } from '../../Utils/Cookie';
import { jobOpening } from "../../Networking/JobOpening";
import { JobOpeningsState } from "../../Context/JobOpeningContext";
import Searchbar from "../../Components/SearchBar";
import { Link } from 'react-router-dom';
import Loader from '../../Components/Loader';
import { deleteJobOpening } from "../../Networking/JobDeleteApiAction";

const JobCard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState('');
  const JobOpeningContext = useContext(JobOpeningsState);
  const [modalWindow, setModalWindow] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    jobOpening()
      .then((res) => {
        if (res.data.code === 200) {
          if (res.data.accessToken) setUpCookie(TOKEN, res.data.accessToken);
          JobOpeningContext.getJobOpening(res.data.data);
          setIsLoading(false);
        } else {
          setErr(res.data.message);
          setIsLoading(false);
        }
      })
      .catch(() => {
        setIsLoading(false);
        toast.warn(`Something went wrong!${err}`);
      });
  }, []);

  const handleModalWindow = (id) => {
    console.log('ckickeddd')
    setModalWindow(true);
    setSelectedId(id);
  };

  const handleDeleteCareer = () => {
    const bodyData = {
      requestId: selectedId
    };
    setIsLoading(true);
    deleteJobOpening(bodyData).then((res) => {
      if (res.data.code === 200) {
        if (res.data.accessToken) setUpCookie(TOKEN, res.data.accessToken);
        setModalWindow(false);
        setIsLoading(false);
        toast.success(res.data.message);
        JobOpeningContext.getJobOpening(prevDepartments => prevDepartments.filter(career => career.id !== selectedId));
        console.log('Deleted department:', selectedId);
      } else {
        setIsLoading(false);
        toast.error(res.data.message);
      }
    });
  };

  return (
    <div className="">
      {isLoading && <Loader />}

      <div className='flex flex-col md:flex-row justify-between items-center bg-gray-50 rounded-md shadow-md px-4 md:px-14 py-2'>
        <Searchbar
          type='text'
          className='appearance-none border focus:outline-none px-8 py-1.5 font-Inter text-sm focus:border-orange-500 transition duration-300'
          placeholder='Search...'
        />
        <p className='flex justify-center text-lg md:text-xl font-semibold text-gray-800 py-2 md:py-0 md:px-4'>
          Job Opening List
        </p>

        <Link to='/AddCareer'>
          <button className='mt-2 md:mt-0 px-4 py-2 uppercase text-xs font-semibold rounded-md bg-orange-400 hover:bg-orange-600 transition duration-300'>
            Add Job opening
          </button>
        </Link>
      </div>

      <div className="h-[650px] no-scrollbar overflow-auto bg-gray-100 rounded-lg shadow-inner">
        {JobOpeningContext.jobData.length > 0 ? (
          <div className="px-4 md:px-14 py-5 bg-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> 
              {JobOpeningContext.jobData.map((job) => (
                <div
                  key={job.id || job.jobTitle}
                  className="bg-white shadow-lg rounded-lg p-6 mb-4 transition-transform duration-300 hover:shadow-2xl hover:scale-105 border border-gray-300"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl md:text-2xl font-bold text-orange-600 tracking-wide hover:text-orange-500 transition-colors duration-300">
                          {job.jobTitle}
                        </h2>
                        <div className="flex space-x-4">
                          <CiEdit className="w-6 h-6 text-gray-600 hover:text-orange-600 cursor-pointer transition-colors duration-300" />
                          <MdDeleteOutline onClick={() => handleModalWindow(job.id)} className="w-6 h-6 text-gray-600 hover:text-orange-600 cursor-pointer transition-colors duration-300" />
                        </div>
                      </div>

                      <div className="text-gray-800 text-sm mb-4">
                        <p><strong>Department:</strong> {job.department}</p>
                        <p><strong>Experience Required:</strong> {job.experienceRequired}</p>
                        <p><strong>Job Mode:</strong> {job.workModeName}</p>
                        <p><strong>Job Timing:</strong> {job.jobTiming}</p>
                        <p><strong>Openings:</strong> {job.noOfOpenings}</p>
                        <p><strong>Applicants:</strong> {job.noOfApplicants}</p>
                        <p><strong>Employment Type:</strong> {job.employmentType}</p>
                      </div>

                      <div className="mt-3">
                        <h3 className="text-lg font-semibold text-orange-600">Key Skills:</h3>
                        <ul className="list-disc ml-5 text-gray-800 text-sm">
                          {job.jobOpeningKeySkillsResponseList.map((skill, index) => (
                            <li key={index} className="hover:text-orange-500 transition-colors duration-300">
                              {skill.keySkills}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-between items-center text-gray-600 text-xs">
                    <span>Posted by {job.createdByUsername}</span>
                    <span>{new Date(job.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-center py-5 text-gray-600">No jobs available</p>
        )}
      </div>

      {modalWindow && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <p className="font-inter font-semibold text-13px ">Are you sure you want to delete this item? This action cannot be undone.</p>
            <div className="flex justify-end space-x-4 mt-4">
              <button onClick={() => setModalWindow(false)} className="bg-gray-300 px-3 py-2 rounded text-13px">Cancel</button>
              <button onClick={handleDeleteCareer} className="bg-red-500 text-white px-3 py-2 rounded text-13px">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobCard;
