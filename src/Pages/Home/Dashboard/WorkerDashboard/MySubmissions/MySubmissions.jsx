import { useQuery } from '@tanstack/react-query';
import useAxiosPublice from '../../../../../Hooks/AxiosPublic/useAxiosPublice';
import useAuth from '../../../../../Hooks/useAuth';
import { BiSolidCoinStack } from 'react-icons/bi';

const MySubmissions = () => {
  const axiosPublice = useAxiosPublice();
  const { user } = useAuth();
  const { data } = useQuery({
    queryKey: ['submissions', user],
    queryFn: async () => {
      const { data } = await axiosPublice.get(
        `/my-submission?worker_email=${user?.email}`
      );

      return data;
    },
  });
  return (
    <div>
      <h2>this is My Submissions</h2>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="bg-green-400 font-semibold text-white ">
            <tr>
              <th></th>
              <th>Name</th>
              <th>Title</th>
              <th>Email</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          {data?.map((item, index) => (
            <tbody key={item._id}>
              {/* row 1 */}
              <tr>
                <th>{index + 1}</th>
                <td>
                  {/* <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src="https://img.daisyui.com/tailwind-css-component-profile-2@56w.png"
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">Hart Hagerty</div>
                      <div className="text-sm opacity-50">United States</div>
                    </div>
                  </div> */}
                  {item?.worker_name}
                </td>
                <td>{item?.task_title}</td>
                <td>{item?.worker_email}</td>
                <td className="flex  font-bold items-center ">
                  {item?.payable_amount}{' '}
                  <BiSolidCoinStack className="text-xl text-orange-400" />
                </td>
                <td>{item?.current_time}</td>
                <td> pending</td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export default MySubmissions;
