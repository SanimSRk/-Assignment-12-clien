import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../../../Hooks/useAuth';
import useAxiosPublice from '../../../../../Hooks/AxiosPublic/useAxiosPublice';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { BiSolidCoinStack } from 'react-icons/bi';

const ManegeUser = () => {
  const { user } = useAuth();
  const axiosPublice = useAxiosPublice();
  const { data } = useQuery({
    queryKey: ['workers-user', user],
    queryFn: async () => {
      const { data } = await axiosPublice.get(`/worker-users`);
      console.log(data);
      return data;
    },
  });

  return (
    <div>
      <div className="mt-8">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead className="font-semibold  uppercase bg-green-400 text-white">
              <tr>
                <th></th>
                <th> IMAGE</th>
                <th>Name</th>
                <th>email</th>
                <th>Role</th>
                <th>Coin</th>
                <th>Update Role</th>
                <th>ACTION</th>
              </tr>
            </thead>
            {data.map((itm, index) => (
              <>
                <tbody key={itm._id}>
                  <tr>
                    <th>
                      <label>{index + 1}</label>
                    </th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-16 h-16">
                            <img src={itm?.image} />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{itm?.fullName}</td>
                    <td>{itm?.email}</td>
                    <td>{itm?.role}</td>
                    <td className="">
                      <div className="flex">
                        {itm?.coin}
                        <BiSolidCoinStack className="text-xl text-orange-400" />
                      </div>
                    </td>
                    <td>
                      <select className="select select-bordered w-full max-w-xs">
                        <option disabled selected>
                          select role
                        </option>
                        <option>admin</option>
                        <option>task-creator</option>
                        <option>worker</option>
                      </select>
                    </td>
                    <th>
                      <button
                        // onClick={() => handileClikDelete(itm?._id)}
                        className="btn p-3 grid items-center justify-center rounded-full bg-orange-500 text-white"
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

export default ManegeUser;
