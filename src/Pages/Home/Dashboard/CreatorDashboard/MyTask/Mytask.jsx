import useAxiosPublice from '../../../../../Hooks/AxiosPublic/useAxiosPublice';
import useAuth from '../../../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { MdUpdate } from 'react-icons/md';

const Mytask = () => {
  const { user } = useAuth();
  const axiosPublice = useAxiosPublice();

  const {
    data: [task],
    refetch,
  } = useQuery({
    queryKey: ['my-task', user],
    queryFn: async () => {
      const { data } = await axiosPublice.get(
        `/my-tasks?creator_email=${user?.email}`
      );

      return data;
    },
  });

  return (
    <div>
      <div className="mt-8">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead className="font-semibold  uppercase bg-green-500 text-white">
              <tr>
                <th></th>
                <th>title</th>
                <th>quantity</th>
                <th>amount</th>
                <th>update</th>
                <th>ACTION</th>
              </tr>
            </thead>
            {task.map((itm, index) => (
              <>
                <tbody key={itm._id}>
                  <tr>
                    <th>
                      <label>{index + 1}</label>
                    </th>
                    <td>{itm?.task_title}</td>
                    <td>{itm?.task_quantity}</td>
                    <td>${itm?.payable_amount}</td>
                    <th>
                      <button className="btn p-3 grid items-center justify-center rounded-full bg-[#B91C1C] text-white">
                        <MdUpdate className="text-2xl" />{' '}
                      </button>
                    </th>
                    <th>
                      <button
                        // onClick={() => handileClikDelete(itm?._id)}
                        className="btn p-3 grid items-center justify-center rounded-full bg-[#B91C1C] text-white"
                      >
                        <RiDeleteBin6Fill className="text-2xl" />{' '}
                      </button>
                    </th>
                  </tr>
                </tbody>
              </>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Mytask;
