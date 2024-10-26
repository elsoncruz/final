import { useContext, useState, useEffect } from 'react';
import { getVoices, deleteVoices } from '../../Networking/Voices';
import { VoicesState } from '../../Context/VoicesContext';
import { useNavigate, Link } from 'react-router-dom';
import { setUpCookie } from '../../Utils/Cookie';
import { TOKEN } from '../../Utils/Constant';
import { toast } from 'react-toastify';
import Loader from '../../Components/Loader';
import SearchBar from '../../Components/SearchBar';
import { IoTrashSharp, IoPencilSharp } from "react-icons/io5";

const GetVoices = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState('');
    const [modal, setModal] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedVoicesId, setSelectedVoicesId] = useState(null);
    const [search, setSearch] = useState(''); 

    const voicesContext = useContext(VoicesState);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        getVoices().then(res => {
            if (res.data.code === 200) {
                if (res.data.accessToken) setUpCookie(TOKEN, res.data.accessToken);
                voicesContext.updateVoices(res.data.data);
                setIsLoading(false);                
            } else {
                setIsLoading(false);
                setErr(res.data.message);
            }
        }).catch(() => {
            setIsLoading(false);
            toast.warn('Something went wrong!')
        });
    }, []);

    const navigateEdit = (id) => {
        navigate(`/editVoices/${id}`, { state: { id: id } });
    };

    const openModal = (id) => {
        setSelectedVoicesId(id);
        setModal(true);
        setTimeout(() => {
          setIsModalVisible(true);
        }, 100);
    };

    const closeModal = () => {
        setIsModalVisible(false);
        setTimeout(() => {
          setModal(false);
          setSelectedVoicesId(null);
        }, 300);
    };

    const handleDelete = () => {
        if (selectedVoicesId) {
            const bodyData = {
                requestId: selectedVoicesId,
            };

            deleteVoices(bodyData).then(res => {
                if (res.data.code === 200) {
                    if (res.data.accessToken) setUpCookie(TOKEN, res.data.accessToken);
                    voicesContext.updateVoices(prev => prev.filter(item => item.id !== selectedVoicesId));
                    toast.success(res.data.message);
                    closeModal();
                } else {
                    toast.error(res.data.message);
                    closeModal();
                }
            }).catch(() => toast.error('Something went wrong!'))
        }
    };

    const handleSearchInputChange = (value) => {
        setSearch(value);
    };

    const filteredVoices = voicesContext.voicesList.filter(item =>
        item.title.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className='h-screen overflow-auto font-Lexand'>
        {isLoading && <Loader />}

        <div className='p-5'>
            <h1 className='text-base uppercase font-semibold'>Voices Of Eloiacs</h1>
            <div className='md:flex justify-between items-center px-5 mt-4'>
                <SearchBar 
                    type='text' 
                    className='appearance-none border focus:outline-none px-8 py-1.5 font-Inter text-sm focus:border-orange-500' 
                    placeholder='Search...' 
                    onInputChange={handleSearchInputChange} 
                />
                <Link to='/addVoices'><button className='mt-2 md:mt-0 px-1.5 py-1.5 uppercase text-xs font-semibold rounded-md bg-orange-400 hover:bg-orange-600'>Add Voices</button></Link>
            </div>

            <div className='px-5 mt-4'>
                <div className='hidden md:flex p-2.5 font-semibold text-xs text-center sticky top-0 border-b bg-orange-500 uppercase'>
                    {['Title', 'Description', 'Created At', 'Image', 'Action'].map((item, i) => (
                        <div key={i} className='flex-1'>{item}</div>
                    ))}
                </div>

                <div className='max-h-96 overflow-auto no-scrollbar'>
                    {filteredVoices.length > 0 ? (
                        filteredVoices.map(item => (
                            <div key={item.id} className='flex flex-col md:flex-row border-b border-gray-300'>
                                <div className='flex-1 text-start md:text-center py-1.5 md:py-3.5 font-Inter text-xs text-gray-500 md:border-none underline underline-offset-2 cursor-pointer hover:text-gray-400'><span className='md:hidden font-semibold uppercase'>Title: </span>{item.title}</div>
                                <div title={item.description} className='flex-1 text-start md:text-center py-1.5 md:py-3.5 font-Inter text-xs text-gray-500 md:border-none'><span className='md:hidden font-semibold uppercase'>Description: </span>{item.description.length > 20 ? `${item.description.substring(0, 20)}...` : item.description}</div>
                                <div className='flex-1 text-start md:text-center py-1.5 md:py-3.5 font-Inter text-xs text-gray-500 md:border-none'><span className='md:hidden font-semibold uppercase'>Created At: </span>{item.createdAt.split(' ')[0]}</div>
                                <div className='flex-1 text-start md:text-center py-1.5 md:py-3.5 font-Inter text-xs text-gray-500 md:border-none'><span className='md:hidden font-semibold uppercase'>Image: </span>
                                    <img src={item.imageUrl} />
                                </div>
                                <div className='flex-1 flex justify-start md:justify-evenly items-center gap-2 md:gap-0 py-1.5 md:py-3.5 font-Inter text-xs text-gray-500 md:border-none'><span className='md:hidden font-semibold uppercase'>Action: </span><IoPencilSharp className='cursor-pointer' onClick={() => navigateEdit(item.id)} /> <IoTrashSharp className='text-red-500 cursor-pointer' onClick={() => openModal(item.id)} /></div>
                            </div>
                        ))
                    ) : (
                        <div className='flex-1 text-center py-3 italic font-Inter font-medium text-base text-red-500'>{err || 'No voices found'}</div>
                    )}
                </div>
            </div>
        </div>

        {modal && (
            <div className={`fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center transition-opacity duration-300 ${isModalVisible ? 'opacity-100' : 'opacity-0'} bg-black bg-opacity-50`}>
                <div className={`bg-white p-6 rounded-md shadow-lg transition-transform duration-300 ${isModalVisible ? 'translate-y-0' : 'translate-y-10'}`}>
                    <p className='font-Inter font-semibold text-base text-justify'>Are you sure you want to delete this item?</p>
                    <div className='flex justify-end space-x-4 mt-4'>
                        <button onClick={() => closeModal()} className='bg-gray-300 px-3 py-2 rounded text-xs hover:bg-gray-400'>Cancel</button>
                        <button onClick={handleDelete} className='bg-red-500 text-white px-3 py-2 rounded text-xs hover:bg-red-600'>Delete</button>
                    </div>
                </div>
            </div>
        )}
    </div>
  )
}

export default GetVoices;
