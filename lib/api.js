
import axios from "axios";
// export const API_BASE = (process.env.NEXT_PUBLIC_API_BASE || 'https://ecom.nearbydoctors.in').replace(/\/+$/, '');
export const Login_API_BASE = ("https://9nutsapi.nearbydoctors.in/public/api").replace(/\/+$/, '');
export const Razorpay_CheckOut_url = "https://checkout.razorpay.com/v1/checkout.js";

const apiAxios = axios.create({
  baseURL: Login_API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});
apiAxios.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = window.localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiAxios.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default apiAxios;

