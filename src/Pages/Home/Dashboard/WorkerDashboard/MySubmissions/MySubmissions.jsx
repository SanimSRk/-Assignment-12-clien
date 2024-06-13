import { useQuery } from '@tanstack/react-query';
import useAxiosPublice from '../../../../../Hooks/AxiosPublic/useAxiosPublice';
import useAuth from '../../../../../Hooks/useAuth';
import { BiSolidCoinStack } from 'react-icons/bi';
import useAxiosSecure from '../../../../../Hooks/AxiosSecure/useAxiosSecure';

const MySubmissions = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loding } = useAuth();
  const { data } = useQuery({
    queryKey: ['submissions', user?.email],
    enabled: !loding && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/my-submission?worker_email=${user?.email}`
      );

      return data;
    },
  });

  const count = data?.length;
  const totalPages = 7;
  const numberOfPages = Math.ceil(count / totalPages);
  const pages = [...Array(numberOfPages).keys()];
  return (
    <div>
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
                <td>
                  <p
                    className={
                      (item.status == 'approve' &&
                        'bg-[#dbf6fa] text-[#00796b] btn rounded-full') ||
                      (item.status == 'pending' &&
                        'bg-[#fff9c4] text-[#ff8c00] btn rounded-full') ||
                      (item.status == 'reject' &&
                        'bg-[#ffcccc] text-[#8b0000] btn rounded-full')
                    }
                  >
                    {item?.status}
                  </p>{' '}
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export default MySubmissions;
