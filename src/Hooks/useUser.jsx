import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './AxiosSecure/useAxiosSecure';

const useUser = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loding } = useAuth();
  const { data, refetch } = useQuery({
    queryKey: [user?.email, 'users'],
    enabled: !loding && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users?email=${user?.email}`);
      console.log(data);
      return data;
    },
  });
  return { data, refetch };
};

export default useUser;
