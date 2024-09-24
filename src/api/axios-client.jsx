import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + 'api',
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// mengecek apakah axios error
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    try {
      const { response } = error;
    } catch (e) {
        console.error(e); //terdapat masalah pada akses axiosnya
    }

    throw error;
  }
);

export default axiosClient;