import useAxiosPublice from '../../../../../Hooks/AxiosPublic/useAxiosPublice';
import useAuth from '../../../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { MdUpdate } from 'react-icons/md';
import { FaCoins } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Mytask = () => {
  const { user } = useAuth();
  const axiosPublice = useAxiosPublice();

  const { data, refetch } = useQuery({
    queryKey: ['my-task', user],
    queryFn: async () => {
      const { data } = await axiosPublice.get(
        `/my-tasks?creator_email=${user?.email}`
      );
      console.log(data);

      return data;
    },
  });

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
        axiosPublice.delete(`/tasks-delete/${id}`).then(res => {
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
            {data?.map((itm, index) => (
              <>
                <tbody key={itm._id} className="">
                  <tr>
                    <th>
                      <label>{index + 1}</label>
                    </th>
                    <td>{itm?.task_title}</td>
                    <td>{itm?.task_quantity}</td>
                    <td className="flex items-center gap-1">
                      {itm?.payable_amount}{' '}
                      <FaCoins className="text-xl text-orange-500"></FaCoins>{' '}
                    </td>
                    <th>
                      <button className="btn p-3 grid items-center justify-center rounded-full bg-orange-500 text-white ">
                        <MdUpdate className="text-2xl" />{' '}
                      </button>
                    </th>
                    <th>
                      <button
                        onClick={() => handileClikDelete(itm?._id)}
                        className="btn p-3 grid items-center justify-center rounded-full bg-orange-600 text-white"
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
