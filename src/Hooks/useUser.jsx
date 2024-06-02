import { useQuery } from '@tanstack/react-query';
import useAxiosPublice from './AxiosPublic/useAxiosPublice';
import useAuth from './useAuth';

const useUser = () => {
  const axiosPublice = useAxiosPublice();
  const { user } = useAuth();
  const { data } = useQuery({
    queryKey: ['users', user],
    queryFn: async () => {
      const { data } = await axiosPublice.get(`/users?email=${user?.email}`);

      return data;
    },
  });
  return { data };
};

export default useUser;
