import { useQuery } from '@tanstack/react-query';
import { BiSolidCoinStack } from 'react-icons/bi';
import useAxiosPublice from '../../Hooks/AxiosPublic/useAxiosPublice';

const TopCarts = ({ items, index }) => {
  const axiosPublice = useAxiosPublice();
  const { data } = useQuery({
    queryKey: ['task-count', items],
    queryFn: async () => {
      const { data } = await axiosPublice.get(
        `/tasks-counts?email=${items?.email}`
      );
      return data;
    },
  });

  return (
    <div className="rounded-xl shadow-md border border-green-400 p-6 ">
      <div className="flex  items-center">
        <p className="text-3xl font-bold ">{index + 1}</p>
        <img className="w-8" src="/achievement.png" alt="" />
      </div>
      <div className="gird w-full text-center justify-center">
        <div className="grid justify-center">
          <div className="grid justify-center">
            <img
              className="w-40 p-2 border-green-400 border h-40 object-cover rounded-full  object-center"
              src={items?.image}
              alt=""
            />
          </div>
          <h2 className="mt-3 text-2xl font-semibold">{items?.fullName}</h2>

          <p className="flex items-center gap-1 my-2">
            Available coins : {items?.coin}{' '}
            <BiSolidCoinStack className="text-xl text-orange-400" />{' '}
          </p>
          <p>Completion tasks: {data?.length}</p>
        </div>
      </div>
    </div>
  );
};

export default TopCarts;
