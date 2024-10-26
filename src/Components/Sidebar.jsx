import React, { useState, useContext } from 'react';
import { MdMenuOpen } from 'react-icons/md';
import { FaHome } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import { BiServer } from 'react-icons/bi';
import { RiHandbagFill } from "react-icons/ri";
import Logo from "../assets/image/Logo.png";
import { FaAngleRight } from "react-icons/fa6";
import { AuthState } from '../../src/Context/AuthContext'; 
import { setUpCookie } from '../Utils/Cookie';
import { TOKEN } from '../Utils/Constant';
import { toast } from 'react-toastify';

const menuItems = [
  {
    icons: <FaHome className='md:text-[20px]' />,
    label: 'Home',
    route: '/',
    dropdown: [ { id:1, subName: 'Voices', linkPage: '/getVoices' },{id:2,subName:'Our Services', linkPage:'/Addservices'} ]
  },
  {
    icons: <RiHandbagFill />,
    label: 'Career',
    route: '/allvoices',
    dropdown: [ {id:1, subName: 'Career List', linkPage: '/CareerList'}, {id:2,subName:'Application',linkPage:'/application'},
      {id:3,subName:'Career-info', linkPage:'/Careerinfo'},{id:4,subName:'Add Job Role', linkPage:'/AddjobRole'}
     ]
  },
  {
    icons: <BiServer className='md:text-[20px]' />,
    label: 'Services',
    route: '/Services',
    dropdown: [{id:1,subName:'CarouselServices', linkPage:'/CarouselServices'}]
  },
  {
    icons: <BiServer className='md:text-[20px]' />,
    label: 'Contact Us',
    route: '/Contact Us',
    dropdown: [ { id:1, subName: 'Contact Us', linkPage: '/ContactUs' } ]
  },
  {
    icons: <BiServer className='md:text-[20px]' />,
    label: 'Department',
    route: '/Department',
    dropdown: [ { id:1, subName: 'Add Department', linkPage: '/AddDepartment' } , { id:2, subName: 'Department List', linkPage: '/GetDepartment' } ]
  }
];

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showLogout, setShowLogout] = useState(false);
  
  const navigate = useNavigate(); 
  const { setIsAuthenticated } = useContext(AuthState); 

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const handleToggle = () => {
    setShowLogout(!showLogout);
  };

  const handleLogout = () => {
    setUpCookie(TOKEN, '');
    setIsAuthenticated(false);
    toast.success('Successfully Logged Out!', {
      onClose: () => navigate('/login'),
    });
  };

  return (
    <div className='hidden md:block'>
      <nav className={`shadow-md h-screen bg-gray-800 duration-200 ${open ? 'w-24 md:w-60' : 'w-9 md:w-16'} sm:p-2 flex flex-col`}>
        <div className={`px-3 py-1 h-auto ${!open && 'rounded-none duration-500'} rounded-full flex justify-between items-center`}>
          <div className={`w-32 pb-4 ${open ? '' : 'hidden'}`}><img src={Logo} alt='Eloiacs-Logo' /></div>
          <MdMenuOpen
            onClick={() => setOpen(!open)}
            color='white'
            className={`${!open && 'rotate-180'} md:text-[35px] duration-200 cursor-pointer`}
          />
        </div>
        <div className='flex-1 mt-2'>
          {menuItems.map((item, index) => (
            <div key={index}>
              <div
                onClick={() => toggleDropdown(index)}
                className='text-white p-2 duration-300 sm:p-4 md:p-4 hover:bg-gray-300 hover:text-black hover:font-semibold cursor-pointer rounded-md flex items-center justify-between group relative'
              >
                <div className='flex items-center'>
                  <div className='pr-3'>
                    {item.icons}
                  </div>
                  <p className={`${!open && 'hidden'} text-[13px] sm:text-[17px] m-1 overflow-hidden duration-100`}>
                    {item.label}
                  </p>
                </div>
                <p className={`${open && 'hidden'} w-0 p-0 overflow-hidden group-hover:w-auto absolute left-24 shadow-md bg-white text-black rounded-md`}>
                  {item.label}
                </p>
                <FaAngleRight
                  className={`transform transition-transform duration-300 ${activeDropdown === index ? 'rotate-90' : ''} cursor-pointer`}
                  size={24}
                />
              </div>
              {item.dropdown.length > 0 && activeDropdown === index && (
                <div className={`ml-6 text-white pl-[20px] rounded-none duration-500 ease-in-out ${!open && 'hidden'}`}>
                  {item.dropdown.map((dropdownItem, subIndex) => (
                    <Link key={subIndex} to={dropdownItem.linkPage} className="block p-2 hover:shadow-lg text-sm hover:border-b">
                      {dropdownItem.subName}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className='flex z-0 justify-between align-bottom md:border rounded-md w-24 md:w-auto bottom-0 h-15 items-center p-2'>
          <FaCircleUser onClick={handleToggle} color='white' className='md:size-[35px] size-[20px] cursor-pointer' />
          <div className={`${!open && 'w-0'} overflow-hidden duration-500 leading-5`}>
            <span className='text-white pl-2 text-[10px] md:text-[16px]'>elsonJason@gmail.com</span>
          </div>
          {showLogout && (
            <button className='ml-2 text-white bg-orange-500 rounded-md px-2 py-1' onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
