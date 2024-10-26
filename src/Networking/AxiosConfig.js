import axios from "axios";
import { getFromCookie, setUpCookie } from "../Utils/Cookie";
import { TOKEN } from "../Utils/Constant";
import { toast } from "react-toastify";

const AxiosConfig = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
})

AxiosConfig.interceptors.request.use(config => {
    const AUTH_TOKEN = getFromCookie(TOKEN)
    if (AUTH_TOKEN) {
        config.headers.Authorization = `Bearer ${AUTH_TOKEN}`
    } else {
        window.location.replace('/login')
    }
    return config
}, error => {
    return Promise.reject(error)
})

AxiosConfig.interceptors.response.use(response => {
    if (response.status === 200) {
        if (response.data.code === 403) {
            setUpCookie(TOKEN, '')
            toast.warn('Session timed out. Login agin!', {
                onClose: () => window.location.replace('/login')
            })
        }
    }
    return response
}, error => {
    return Promise.reject(error)
})

export default AxiosConfig;