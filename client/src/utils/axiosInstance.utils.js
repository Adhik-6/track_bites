import axios from 'axios'

const baseUrl = (import.meta.env.MODE=="production")?import.meta.env.VITE_BACKEND_URL:`${import.meta.env.VITE_BACKEND_URL_DEV}/api`

const axiosInstance = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
})

export default axiosInstance