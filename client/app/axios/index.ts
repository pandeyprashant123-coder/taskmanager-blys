import axios from "axios";

let token = null;

if (typeof window !== "undefined") {
  token =
    window.localStorage.getItem(process.env.AUTH_PREFIX!) 
}

export default axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});
