import { useQuery } from '@tanstack/react-query';
import useAxiosPublice from '../../../../../Hooks/AxiosPublic/useAxiosPublice';
import useAuth from '../../../../../Hooks/useAuth';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { FaCoins } from 'react-icons/fa';

const PaymentsHistory = () => {
  const axiosPublice = useAxiosPublice();
  const { user } = useAuth();
  const { data } = useQuery({
    queryKey: ['payment', user],
    queryFn: async () => {
      const { data } = await axiosPublice.get(
        `/payment-history?email=${user?.email}`
      );
      return data;
    },
  });
  console.log(data);

  return (
    <div>
      <div className="mt-8">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead className="font-semibold  uppercase bg-green-500 text-white">
              <tr>
                <th></th>
                <th>Email</th>
                <th>Date</th>
                <th>TransactionId</th>
                <th>Coins</th>
              </tr>
            </thead>
            {data?.map((itm, index) => (
              <>
                <tbody key={itm._id} className="">
                  <tr>
                    <th>
                      <label>{index + 1}</label>
                    </th>
                    <td>{itm?.email}</td>
                    <td>{itm?.date}</td>
                    <td>{itm?.transactionId}</td>
                    <td>
                      <div className="flex items-center gap-1">
                        {itm?.coin}{' '}
                        <FaCoins className="text-xl text-orange-500"></FaCoins>{' '}
                      </div>
                    </td>
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

export default PaymentsHistory;
