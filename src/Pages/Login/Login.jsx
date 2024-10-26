import React, { useState, useContext, useEffect } from 'react';
import Logo from "../../assets/image/Logo.png";
import axios from 'axios';
import { setUpCookie } from '../../Utils/Cookie';
import { TOKEN } from '../../Utils/Constant';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthState } from '../../Context/AuthContext';
import Loader from '../../Components/Loader';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);


    const navigate = useNavigate();

    const { setIsAuthenticated } = useContext(AuthState);



    const handleSubmit = () => {

        if (username.length === 0 || password.length === 0) {
            return setError(true)
        }

        const bodyData = {
            email: username,
            password: password
        }

        setLoading(true)
        axios.post(`${process.env.REACT_APP_BASE_URL}/auth/login`, bodyData).then(res => {
            setUpCookie(TOKEN, res.data.accessToken);
            toast.success(res.data.message, {
                onClose: () => navigate('/'),
            });
            setIsAuthenticated(true);
            setLoading(false);
        }).catch(() => {
            toast.error('Login Failed. Please check your credentials and try again.');
            navigate('/login');
            setIsAuthenticated(false);
            setLoading(false);
        })

    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-300">
            {loading && <Loader />}
            <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-md">
                <div className="flex items-center justify-center">
                    <img src={Logo} alt="Logo" className="w-28 h-12" />
                </div>
                <h2 className="text-center text-lg font-semibold text-gray-800">
                    Login in to your account
                </h2>
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-600">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        placeholder="Enter username"
                        onChange={(e) => setUsername(e.target.value)}
                        className={`mt-1 block w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${error && !username ? "border-red-500" : ""}`}
                    />
                </div>

                <div className="relative">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={password}
                        placeholder="Enter password"
                        onChange={(e) => setPassword(e.target.value)}
                        className={`mt-1 block w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${error && !password ? "border-red-500" : ""}`}
                    />
                    <div
                        className="absolute inset-y-0 right-0 pt-6 pr-3 flex items-center cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <AiFillEye className='text-gray-400' /> : <AiFillEyeInvisible className='text-gray-400' />}
                    </div>
                </div>
                <button type="submit" className="w-full px-4 py-2 mt-4 text-white bg-orange-500 rounded-md hover:bg-orange-600" onClick={handleSubmit}>LOGIN</button>
            </div>

        </div>
    );
}
export default LoginPage;