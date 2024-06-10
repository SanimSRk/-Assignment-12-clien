import { useQuery } from '@tanstack/react-query';
import { BiSolidCoinStack } from 'react-icons/bi';
import useAxiosPublice from '../../Hooks/AxiosPublic/useAxiosPublice';

const TopCarts = ({ items }) => {
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
    <div className="rounded-xl shadow-md border border-green-400 p-6 text-center grid justify-center">
      <div className="gird justify-center">
        <img
          className="w-44 object-cover object-center"
          src={items?.image}
          alt=""
        />
        <h2 className="mt-3 text-2xl font-semibold">{items?.fullName}</h2>

        <p className="flex items-center gap-1 my-2">
          Available coins : {items?.coin}{' '}
          <BiSolidCoinStack className="text-xl text-orange-400" />{' '}
        </p>
        <p>Completion tasks: {data?.length}</p>
      </div>
    </div>
  );
};

export default TopCarts;
