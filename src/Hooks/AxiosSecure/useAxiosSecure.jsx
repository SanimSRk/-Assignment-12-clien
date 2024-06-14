import axios from 'axios';
import useAuth from '../useAuth';
import { useNavigate } from 'react-router-dom';

const axiosSecure = axios.create({
  baseURL: 'https://assignment-12-server-eight-alpha.vercel.app',
});
const useAxiosSecure = () => {
  const { hanidleClickLogouts } = useAuth();
  const navigate = useNavigate();
  axiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem('token');
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      const status = error.response.status;
      console.log(status);
      if (status === 401 || status === 403) {
        hanidleClickLogouts()
          .then(res => {
            console.log(res);
          })
          .catch(error => {
            console.log(error);
          });
        navigate('/login');
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
