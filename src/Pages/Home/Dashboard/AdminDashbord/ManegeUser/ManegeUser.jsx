import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../../../Hooks/useAuth';
import useAxiosPublice from '../../../../../Hooks/AxiosPublic/useAxiosPublice';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { BiSolidCoinStack } from 'react-icons/bi';
import Swal from 'sweetalert2';

const ManegeUser = () => {
  const { user } = useAuth();
  const axiosPublice = useAxiosPublice();

  const { data, refetch } = useQuery({
    queryKey: ['workers-user', user],
    queryFn: async () => {
      const { data } = await axiosPublice.get(`/worker-users`);
      return data;
    },
  });

  const handileClickRole = (roles, id, coins) => {
    const role = roles;
    const coin = coins;
    const roleInfo = {
      role,
      coin,
    };
    axiosPublice.patch(`/user-role/${id}`, roleInfo).then(res => {
      if (res.data.matchedCount) {
        Swal.fire({
          position: 'top-center',
          icon: 'success',
          title: 'Suscess fully registration done ',
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
    });
    console.log(role, coin);
  };

  const handileClikDelete = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        axiosPublice.delete(`/delete-user/${id}`).then(res => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: 'Deleted!',
              text: 'Your file has been deleted.',
              icon: 'success',
            });
          }
        });
      }
    });
  };
  return (
    <div>
      <div className="mt-8">
        <div className="overflow-x-auto ">
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
            {data?.map((itm, index) => (
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
                      <div>
                        <div className="dropdown dropdown-end ">
                          <div tabIndex={0} role="button" className="btn m-1">
                            select role
                          </div>
                          <ul
                            tabIndex={0}
                            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                          >
                            <li
                              onClick={() =>
                                handileClickRole('admin', itm?._id, 'unlimeted')
                              }
                            >
                              <a>Admin</a>
                            </li>
                            <li
                              onClick={() =>
                                handileClickRole('taskCreator', itm?._id, 50)
                              }
                            >
                              <a>Task-creator</a>
                            </li>
                            <li
                              onClick={() =>
                                handileClickRole('worker', itm?._id, 10)
                              }
                            >
                              <a>Worker</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </td>
                    <th>
                      <button
                        onClick={() => handileClikDelete(itm?._id)}
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
