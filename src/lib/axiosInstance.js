import axios from "axios";
import Cookies from "js-cookie";


const NEXT_PUBLIC_BACKEND_URL = 'https://dash.motazmcqs.com/api/'
const Axios = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  baseURL: NEXT_PUBLIC_BACKEND_URL,
  headers: {
    Authorization: `Bearer ${Cookies.get("auth_token")}`,
  },
});

export default Axios;
