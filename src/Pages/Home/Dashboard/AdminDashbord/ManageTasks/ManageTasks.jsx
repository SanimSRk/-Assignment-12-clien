import { useQuery } from '@tanstack/react-query';
import useAxiosPublice from '../../../../../Hooks/AxiosPublic/useAxiosPublice';
import { BiSolidCoinStack } from 'react-icons/bi';
import { FcDeleteDatabase, FcViewDetails } from 'react-icons/fc';
import { RiDeleteBin6Fill } from 'react-icons/ri';

const ManageTasks = () => {
  const axiosPublice = useAxiosPublice();
  const { data } = useQuery({
    queryKey: ['manageTask'],
    queryFn: async () => {
      const { data } = await axiosPublice.get('/tasks-manages');
      return data;
    },
  });

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
              <th>Task Quantity</th>
              <th>Amount</th>
              <th>Deatils</th>
              <th>Action</th>
              <th></th>
            </tr>
          </thead>
          {data?.map((item, index) => (
            <tbody key={item._id}>
              {/* row 1 */}
              <tr>
                <th>{index + 1}</th>
                <td>{item?.creator_name}</td>
                <td>{item?.task_title}</td>
                <td>{item?.task_quantity}</td>
                <td>
                  <div className="flex  font-bold items-center p-1 ">
                    {item?.payable_amount}{' '}
                    <BiSolidCoinStack className="text-xl text-orange-400" />
                  </div>
                </td>
                <td>
                  <button
                    onClick={() =>
                      document.getElementById('my_modal_2').showModal()
                    }
                  >
                    <FcViewDetails className="text-3xl" />
                  </button>

                  <dialog id="my_modal_2" className="modal">
                    <div className="modal-box">
                      <h3 className="font-bold text-lg">Hello!</h3>
                      <p className="py-4">
                        Press ESC key or click outside to close
                      </p>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                      <button>close</button>
                    </form>
                  </dialog>
                </td>
                <td>
                  <button className="rounded-full ">
                    {' '}
                    <RiDeleteBin6Fill className="text-4xl bg-orange-600 text-white rounded-full p-1" />{' '}
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

export default ManageTasks;
