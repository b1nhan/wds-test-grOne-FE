import axios from 'axios';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

axiosClient.interceptors.response.use(
  (res) => res.data,
  (err) => {
    const message =
      err.response?.data?.message || 'Lỗi hệ thống, vui lòng thử lại sau!';
    return Promise.reject(message);
  },
);

export default axiosClient;
