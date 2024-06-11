import { useQuery } from '@tanstack/react-query';
import useAxiosPublice from '../../Hooks/AxiosPublic/useAxiosPublice';
import TopCarts from './TopCarts';

const TopSixUsers = () => {
  const axiosPublice = useAxiosPublice();
  const { data } = useQuery({
    queryKey: ['tosix-data'],
    queryFn: async () => {
      const { data } = await axiosPublice.get('top-six');
      return data;
    },
  });

  return (
    <div className="my-[110px]">
      <h2 className="text-center text-3xl font-bold text-green-400">
        Top Earners Users
      </h2>
      <div className="grid lg:grid-cols-3 mt-8 gap-6 md:grid-cols-2 grid-cols-1">
        {data?.map((items, index) => (
          <TopCarts key={items._id} items={items} index={index}></TopCarts>
        ))}
      </div>
    </div>
  );
};

export default TopSixUsers;
