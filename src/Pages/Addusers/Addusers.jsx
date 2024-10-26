import React from 'react';
import eye from '../../assets/icons/eye.svg';
import edit from '../../assets/icons/edit.svg';
import del from '../../assets/icons/delete.svg';

const JobList = () => {
  const jobs = [
    { id: 1, position: 'Network Engineer', type: 'Full-Time', postedDate: '12-01-2024', lastDate: '24-01-2024', closeDate: '25-01-2024', status: 'Active' },
    { id: 2, position: 'Entry Level Software Developer', type: 'Part-Time', postedDate: '12-01-2024', lastDate: '24-01-2024', closeDate: '25-01-2024', status: 'Active' },
    { id: 3, position: 'Java Developer', type: 'Full-Time', postedDate: '12-01-2024', lastDate: '24-01-2024', closeDate: '25-01-2024', status: 'Inactive' },
    { id: 4, position: 'IOS Developer', type: 'Part-Time', postedDate: '12-01-2024', lastDate: '24-01-2024', closeDate: '25-01-2024', status: 'Inactive' },
    { id: 4, position: 'IOS Developer', type: 'Part-Time', postedDate: '12-01-2024', lastDate: '24-01-2024', closeDate: '25-01-2024', status: 'Inactive' },
    { id: 4, position: 'IOS Developer', type: 'Part-Time', postedDate: '12-01-2024', lastDate: '24-01-2024', closeDate: '25-01-2024', status: 'Inactive' },
    { id: 4, position: 'IOS Developer', type: 'Part-Time', postedDate: '12-01-2024', lastDate: '24-01-2024', closeDate: '25-01-2024', status: 'Inactive' },
    { id: 4, position: 'IOS Developer', type: 'Part-Time', postedDate: '12-01-2024', lastDate: '24-01-2024', closeDate: '25-01-2024', status: 'Inactive' },
    { id: 4, position: 'IOS Developer', type: 'Part-Time', postedDate: '12-01-2024', lastDate: '24-01-2024', closeDate: '25-01-2024', status: 'Inactive' },
    { id: 4, position: 'IOS Developer', type: 'Part-Time', postedDate: '12-01-2024', lastDate: '24-01-2024', closeDate: '25-01-2024', status: 'Inactive' },
    { id: 4, position: 'IOS Developer', type: 'Part-Time', postedDate: '12-01-2024', lastDate: '24-01-2024', closeDate: '25-01-2024', status: 'Inactive' },
 ];

  return (
    <div className="p-4 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">Job List</h1>
        <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition duration-200 text-sm md:text-base">
          + Add New Job
        </button>
      </div>

      <div className="overflow-x-auto h-[550px] no-scrollbar">
        <table className="min-w-full bg-white rounded-lg shadow ">
          <thead className='sticky top-0 z-50'>
            <tr className="bg-orange-500  text-sm md:text-base">
              <th className="py-3 px-4  text-left text-white font-medium">No</th>
              <th className="py-3 pl-32 text-left text-white font-medium">Position</th>
              <th className="py-3 pl-12 text-left text-white font-medium">Type</th>
              <th className="py-3 pl-10 text-left text-white font-medium">Posted Date</th>
              <th className="py-3 pl-10 text-left text-white font-medium">Last Date To Apply</th>
              <th className="py-3 pl-7  text-left text-white font-medium">Close Date</th>
              <th className="py-3 pl-8  text-left text-white font-medium">Status</th>
              <th className="py-3 pl-14 text-left text-white font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index) => (
              <tr
                key={job.id}
                className="border-t border-gray-200 text-sm md:text-base animate-fadeIn hover:bg-gray-100 transition duration-300" 
                style={{ animationDelay: `${index * 0.2}s` }} 
              >
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4">{job.position}</td>
                <td className="py-3 px-4">{job.type}</td>
                <td className="py-3 px-4">{job.postedDate}</td>
                <td className="py-3 px-4">{job.lastDate}</td>
                <td className="py-3 px-4">{job.closeDate}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-lg text-xs font-semibold transition-colors duration-200 ${
                    job.status === 'Active'
                      ? 'bg-green-100 text-green-600 hover:bg-green-200'  
                      : 'bg-red-100 text-red-600 hover:bg-red-200'       
                  }`}>
                    {job.status}
                  </span>
                </td>
                <td className="py-3 px-4 flex space-x-2">
                  <button className="bg-green-100 p-2 rounded-full hover:bg-green-200 transition duration-150 transform hover:scale-110 shadow hover:shadow-lg">
                    <img src={eye} alt="view" className="w-5 h-5" />
                  </button>
                  <button className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition duration-150 transform hover:scale-110 shadow hover:shadow-lg">
                    <img src={edit} alt="edit" className="w-5 h-5" />
                  </button>
                  <button className="bg-red-100 p-2 rounded-full hover:bg-red-200 transition duration-150 transform hover:scale-110 shadow hover:shadow-lg">
                    <img src={del} alt="delete" className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobList;
