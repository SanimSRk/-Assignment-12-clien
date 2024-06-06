import { useQuery } from '@tanstack/react-query';
import useAxiosPublice from './AxiosPublic/useAxiosPublice';
import useAuth from './useAuth';

const useUser = () => {
  const axiosPublice = useAxiosPublice();
  const { user } = useAuth();
  const { data, refetch } = useQuery({
    queryKey: ['users', user],
    queryFn: async () => {
      const { data } = await axiosPublice.get(`/users?email=${user?.email}`);

      return data;
    },
  });
  return { data, refetch };
};

export default useUser;
