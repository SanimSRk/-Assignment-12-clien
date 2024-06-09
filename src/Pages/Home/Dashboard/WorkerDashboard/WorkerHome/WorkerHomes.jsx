import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../../../Hooks/useAuth';
import useUser from '../../../../../Hooks/useUser';
import useAxiosPublice from '../../../../../Hooks/AxiosPublic/useAxiosPublice';
import { BiSolidCoinStack } from 'react-icons/bi';

const WorkerHomes = () => {
  const { data: userDatas, refetch } = useUser();
  const axiosPublice = useAxiosPublice();
  const { user } = useAuth();
  const { data: workers } = useQuery({
    queryKey: ['all-submit', user],
    queryFn: async () => {
      const { data } = await axiosPublice.get(
        `/worker-allSubmicon?worker_email=${user?.email}`
      );
      return data;
    },
  });
  const { data: totalAmount } = useQuery({
    queryKey: ['total-amount', user],
    queryFn: async () => {
      const { data } = await axiosPublice.get(
        `/workers-amounts?worker_email=${user?.email}`
      );
      return data;
    },
  });
  const workerAmount = totalAmount?.reduce(
    (total, items) => total + parseFloat(items?.payable_amount),
    0
  );

  return (
    <div className="mt-12">
      <div>
        <div className="lg:flex md:flex gap-12 justify-between">
          <div className="stat shadow">
            <div className="stat-figure text-primary">
              <BiSolidCoinStack className="text-3xl" />
            </div>
            <div className="stat-title">Available coin</div>
            <div className="stat-value text-primary">{userDatas?.coin} </div>
            <div className="stat-desc">21% more than last month</div>
          </div>

          <div className="stat shadow">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-8 h-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
            </div>
            <div className="stat-title">Total Submission</div>
            <div className="stat-value text-secondary">{workers?.length}</div>
            <div className="stat-desc">21% more than last month</div>
          </div>

          <div className="stat shadow">
            <div className="stat-figure text-secondary">
              <BiSolidCoinStack className="text-3xl" />
            </div>
            <div className="stat-title">Total Earning</div>
            <div className="stat-value">{workerAmount}</div>

            <div className="stat-desc text-secondary">31 tasks remaining</div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-bold mt-16 text-center text-green-400">
          Your approved submission{' '}
        </h2>
        <div className="overflow-x-auto mt-8">
          <table className="table">
            {/* head */}
            <thead className="bg-green-400 font-semibold text-white ">
              <tr>
                <th></th>
                <th>Title</th>
                <th>Payable amount</th>
                <th>Creator name</th>
                <th>Status</th>
              </tr>
            </thead>
            {totalAmount?.map((item, index) => (
              <tbody key={item._id}>
                {/* row 1 */}
                <tr>
                  <th>{index + 1}</th>
                  <td>{item?.task_title}</td>
                  <td className="flex  font-bold items-center ">
                    {item?.payable_amount}{' '}
                    <BiSolidCoinStack className="text-xl text-orange-400" />
                  </td>
                  <td>{item?.creator_name}</td>
                  <td>
                    <button className="bg-[#dbf6fa] text-[#00796b] btn rounded-full">
                      {item?.status}
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default WorkerHomes;
