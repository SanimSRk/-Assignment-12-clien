import { useQuery } from '@tanstack/react-query';
import useAxiosPublice from '../../../../../Hooks/AxiosPublic/useAxiosPublice';
import { BiSolidCoinStack } from 'react-icons/bi';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../../Hooks/AxiosSecure/useAxiosSecure';

const AdminHomeTabile = () => {
  const axiosPublice = useAxiosPublice();
  const axiosSecure = useAxiosSecure();
  const { data, refetch } = useQuery({
    queryKey: ['withdraw'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/success-payments');
      return data;
    },
  });

  const habndileClickDelete = id => {
    axiosSecure.delete(`/withdraw-deletes/${id}`).then(res => {
      console.log(res.data);
      if (res.data.deletedCount) {
        Swal.fire({
          title: 'Success',
          text: 'Payment Success fully done ',
          icon: 'success',
        });
        refetch();
      }
    });
  };
  return (
    <div>
      <div className="overflow-x-auto mt-8">
        <table className="table">
          {/* head */}
          <thead className="bg-green-400 font-semibold text-white ">
            <tr>
              <th></th>
              <th>Worker name</th>
              <th>Withdraw coin</th>
              <th>Withdraw amount</th>
              <th>Payment Number</th>
              <th>Payment system</th>
              <th>Withdraw time</th>
              <th>Payment Success</th>
            </tr>
          </thead>
          {data?.map((item, index) => (
            <tbody key={item._id}>
              {/* row 1 */}
              <tr>
                <th>{index + 1}</th>
                <td>{item?.worker_name}</td>

                <td className=" ">
                  <div className="flex font-bold items-center">
                    {item?.withdraw_coin}{' '}
                    <BiSolidCoinStack className="text-xl text-orange-400" />
                  </div>
                </td>
                <td>{item?.withdraw_amount}$</td>
                <td>{item?.numbers}</td>
                <td>{item?.payments}</td>
                <td>{item?.withdraw_time}</td>
                <td>
                  <button
                    onClick={() => habndileClickDelete(item?._id)}
                    className="bg-green-400 text-[#ffffff] btn rounded-full"
                  >
                    Payment Success
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export default AdminHomeTabile;
