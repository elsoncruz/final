import { useContext } from "react";
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import { AuthContext, AuthState } from "./Context/AuthContext";
import { getFromCookie } from "./Utils/Cookie";
import { TOKEN } from "./Utils/Constant";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from "./Components/Sidebar";
import Login from "./Pages/Login/Login";
import Dashboard from "./Pages/Dashboard/Dashboard";
import CareerList from "./Pages/Career/CareerList";
import AddCareer from "./Pages/Career/AddCareer";
import GetVoices from "./Pages/Voices/GetVoices";
import ContactUs from "./Pages/ContactUs/Contact"

import { VoicesState, GetVoices as VoicesProvider, VoicesContext } from "./Context/VoicesContext";
import { JobOpenConT } from "./Context/JobOpenContext";
import AddVoices from "./Pages/Voices/AddVoices";
import AddDepartment from "./Pages/Department/AddDepartment";
import GetDepartment from "./Pages/Department/GetDepartment";
import UpdateDepartment from './Pages/Department/UpdateDepartment'
import { DepartmentContext } from "./Context/DepartmentContext";
import { ContactUsProvider } from "./Context/GetContactContext";
import ApplicationAll from "./Pages/Application/ApplicationAll";
import { ApplicationConT } from "./Context/ApplicationContext";
import Addservices from "./Pages/ourservices/addServices";
import { ServiceConT } from "./Context/ServicesContext";
import UpdateServiceslist from "./Pages/ourservices/UpdateServices";
import CarouselServices from "./Pages/services-carousel/CarouselServAll";
import { CarouselConT } from "./Context/CarouselContext";
import UpdateCarouselList from "./Pages/services-carousel/CarouselUPdate";
import Career from "./Pages/Career/CareerInfo";
import { JobOpeningContext } from "./Context/JobOpeningContext";
import AddJobRole from "./Pages/JobRole/addJobRole";

const AppComponent = () => {
  const { isAuthenticated } = useContext(AuthState);

  return (
    <BrowserRouter>
      <ToastContainer autoClose={2000} />
      <Routes>
        <Route path='/login' element={isAuthenticated ? <Navigate to='/' /> : <Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/' element={<Dashboard />} />
          <Route path="/getVoices" element={<GetVoices />} />
          <Route path="/addVoices" element={<AddVoices />} />
          <Route path="/Addservices" element={<Addservices/>}/>
          <Route path="/UpdateServices" element={<UpdateServiceslist/>}/>
          <Route path="/CarouselServices" element={<CarouselServices/>}/>
          <Route path="/UpdateCarousel" element={<UpdateCarouselList/>}/>
          <Route path="/CareerList" element={<CareerList />} />
          <Route path="/Careerinfo" element={<Career/>}/>
          <Route path="/AddCareer" element={<AddCareer />} />
          <Route path="/ContactUs" element={<ContactUs/>} />
         <Route path="/AddjobRole" element={<AddJobRole/>}/>
          <Route path="/AddDepartment" element={<AddDepartment/>} />
          <Route path="/GetDepartment" element={<GetDepartment/>} />
          <Route path="/UpdateDepartment/:id" element={<UpdateDepartment/>} />
          <Route path="/application" element={<ApplicationAll/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

const ProtectedRoute = () => {
  const AUTH_TOKEN = getFromCookie(TOKEN);
  if (!AUTH_TOKEN) {
    return <Navigate to='/login' />;
  }

  return (
    <div className='flex'>
      <Sidebar /> 
      <main className='w-full'>
        <Outlet />
      </main>
    </div>
  );
};

function App() {
  return (
    <AuthContext>
      <VoicesContext>
        <JobOpenConT>
          <JobOpeningContext>
              <ContactUsProvider>
           <DepartmentContext>
            <ApplicationConT>
              <CarouselConT>
                 <ServiceConT>
                 <AppComponent />
              </ServiceConT>
              </CarouselConT>
            </ApplicationConT>
        </DepartmentContext>
          </ContactUsProvider>
          </JobOpeningContext>
        </JobOpenConT>
      </VoicesContext>
    </AuthContext>
  );
}

export default App;
