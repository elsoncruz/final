import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { DepartmentState } from '../../Context/DepartmentContext';
import { setUpCookie } from '../../Utils/Cookie';
import { TOKEN } from '../../Utils/Constant';
import { GetDepartmentApi, DeleteDepartmentApi } from '../../Networking/DepartmentApiAction';
import Loader from '../../Components/Loader';
import SearchBar from '../../Components/SearchBar';
import { IoTrashSharp, IoPencilSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';

const GetDepartment = () => {
    const navigate = useNavigate();
    const updateContext = useContext(DepartmentState);
    const [modalWindow, setModalWindow] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [loader, setLoader] = useState(false);
    const [search, setSearch] = useState(''); 

    useEffect(() => {   
        setLoader(true);    

        GetDepartmentApi().then((response) => {  

            if (response.data.code === 200) {
                if (response.data.accessToken) setUpCookie(TOKEN, response.data.accessToken);
                const data = response.data.data;
                updateContext.updateDepartment(data);
                setLoader(false);                
                console.log('data', data);
            } else {
                setLoader(false);
                toast.error(response.data.message);
            }            
        });
    }, []);

    const handleEdit = (id, name) => {
        navigate(`/updateDepartment/${id}`, {state: {departmentId: id, departmentName: name }});       
    };

    const handleModalWindow = (id) => {
        setModalWindow(true);
        setSelectedId(id);
    };

    const handleDelete = () => {
        const bodyData = {
            requestId: selectedId
        };
        setLoader(true);
        DeleteDepartmentApi(bodyData).then((res) => {
            if (res.data.code === 200) {
                if (res.data.accessToken) setUpCookie(TOKEN, res.data.accessToken);
                setModalWindow(false);
                setLoader(false);
                toast.success(res.data.message);
                updateContext.updateDepartment(prevDepartments => prevDepartments.filter(dept => dept.departmentId !== selectedId));
                console.log('Deleted department:', selectedId);
            } else {
                setLoader(false);
                toast.error(res.data.message);
            }
        });
    };

    const handleSearchInputChange = (value) => {
        setSearch(value);
    };

    const filteredDepartments = updateContext.getDepartment.filter(item =>
        item.departmentName.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            {loader && <Loader />}
            <p className='mt-5 text-3xl mb-10 flex justify-center uppercase px-6'> Our Departments</p>
           <div className=' flex justify-center'>
            <div className="no-scrollbar  flex justify-center flex-col max-h-96 overflow-y-auto pb-10 px-8 w-2/3">   

             <div className=' pb-5 flex justify-between'>
                <SearchBar 
                    type='text' 
                    className='appearance-none border focus:outline-none px-8 py-1.5 font-Inter text-sm focus:border-orange-500' 
                    placeholder='Search...' 
                    onInputChange={handleSearchInputChange} 
                />
             <Link to='/AddDepartment'><button className='mt-2 md:mt-0 px-1.5 py-1.5 uppercase text-xs font-semibold rounded-md text-white bg-orange-600 hover:bg-orange-400'>Add Voices</button></Link>
            </div>             
                <div className="hidden md:flex p-3 font-Inter font-semibold text-xs text-center sticky top-0 border-b bg-orange-500 text-white">
                    <div className="flex-1">Department</div>
                    <div className="flex-1">Actions</div>                       
                </div>                  
                {filteredDepartments.length > 0 ? filteredDepartments.map((item, index) => (
                    <div key={item.departmentId} className={`mt-1 flex flex-col md:flex-row border-b border-gray-300 ${index % 2 === 0 ? 'bg-gray-200' : 'bg-white'}`}>
                        <div className="flex-1 text-center py-3.5 font-Inter text-xs text-gray-500 md:border-none">
                            <span className="md:hidden font-semibold">Department: </span>{item.departmentName}
                        </div>
                        <div className="flex-1 text-center py-3.5 font-Inter text-xs text-gray-500 md:border-none"> 
                            <span className="md:hidden font-semibold">Action: </span>
                            <div className='flex gap-5 justify-center text-lg'>
                                <IoPencilSharp className='cursor-pointer' onClick={() => handleEdit(item.departmentId, item.departmentName)} />
                                <IoTrashSharp className='cursor-pointer' onClick={() => handleModalWindow(item.departmentId)} />
                            </div>
                        </div>                              
                    </div>
                )) : (
                    <div className="flex-1 text-center py-3 italic font-Inter font-medium text-base text-red-500">No data available.</div>
                )}
            </div>
            </div>
            {modalWindow && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <p className="font-inter font-semibold text-13px ">Are you sure you want to delete this item? This action cannot be undone.</p>
                        <div className="flex justify-end space-x-4 mt-4">
                            <button onClick={() => setModalWindow(false)} className="bg-gray-300 px-3 py-2 rounded text-13px">Cancel</button>
                            <button onClick={handleDelete} className="bg-red-500 text-white px-3 py-2 rounded text-13px">Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GetDepartment;
