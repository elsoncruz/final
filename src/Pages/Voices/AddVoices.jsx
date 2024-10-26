import { useState } from 'react';
import { addVoices } from '../../Networking/Voices';
import Loader from '../../Components/Loader';
import { setUpCookie } from '../../Utils/Cookie';
import { TOKEN } from '../../Utils/Constant';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddVoices = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [imageDescription, setImageDescription] = useState('');
  const [errors, setErrors] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = () => {

    if (title.length === 0 || description.length === 0 || imageDescription.length === 0) {
      return setErrors(true);
    }

    const bodyData = {
      title: title,
      description: description,
      image: "string",
      imageDescription: imageDescription
    }

    setIsLoading(true);
    addVoices(bodyData).then(res => {
      if (res.data.code === 200) {
        if (res.data.accessToken) setUpCookie(TOKEN, res.data.accessToken);
        toast.success(res.data.message, {
          onClose: () => navigate('/getVoices')
        });
        setIsLoading(false);
      } else {
        toast.error(res.data.message);
        setIsLoading(false);
      }
    }).catch(() => {
      setIsLoading(false);
      toast.warn('Something went wrong!');
    })
  };


  return (
    <div className='h-screen overflow-auto font-Lexand'>
      {isLoading && <Loader />}

      <div className='p-5'>
        <h1 className='text-base uppercase font-semibold'>Add Voices of Eloiacs</h1>
        <div className='flex justify-center items-center h-96'>
          <div className='mt-4 bg-white shadow-md w-10/12 border border-dashed'>
            <div className='px-3 py-2.5'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                <div className='mb-4'>
                  <label className='block mb-2 uppercase'>Title</label>
                  <input value={title} onChange={(e) => setTitle(e.target.value)} className='w-full px-1.5 py-2 focus:outline-none border-b border-gray-400 border-dashed bg-zinc-300 bg-opacity-20 rounded' placeholder='Enter Title'/>
                  {errors && !title ? <p className='text-xs text-red-600 italic'>Title Required.</p> : null}
                </div>
                <div className='mb-4'>
                  <label className='block mb-2 uppercase'>Description</label>
                  <textarea value={description} onChange={(e) => setDescription(e.target.value)} className='w-full px-1.5 py-2 focus:outline-none border-b border-gray-400 border-dashed bg-zinc-300 bg-opacity-20 rounded' placeholder='Voices Description' />
                  {errors && !description ? <p className='text-xs text-red-600 italic'>Description Required.</p> : null}
                </div>
                <div>
                  <label className='block mb-2 uppercase'>Image</label>
                  <img />
                </div>
                <div>
                  <label className='block mb-2 uppercase'>Image Description</label>
                  <textarea value={imageDescription} onChange={(e) => setImageDescription(e.target.value)} className='w-full px-1.5 py-2 focus:outline-none border-b border-gray-400 border-dashed bg-zinc-300 bg-opacity-20 rounded' placeholder='Enter Image Description' />
                  {errors && !imageDescription ? <p className='text-xs text-red-600 italic'>Image Description Required.</p> : null}
                </div>
              </div>

              <div className='flex justify-end gap-4 mt-3 mb-4'>
                <button onClick={() => navigate('/getVoices')} className='hover:text-red-500'>Close</button>
                <button onClick={handleSubmit} className='hover:font-semibold'>Save</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default AddVoices