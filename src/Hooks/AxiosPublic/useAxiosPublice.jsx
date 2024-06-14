import axios from 'axios';

const axiosPublice = axios.create({
  baseURL: 'https://assignment-12-server-eight-alpha.vercel.app',
});
const useAxiosPublice = () => {
  return axiosPublice;
};

export default useAxiosPublice;
