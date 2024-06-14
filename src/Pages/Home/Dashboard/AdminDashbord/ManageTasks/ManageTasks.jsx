import { useQuery } from '@tanstack/react-query';
import { BiSolidCoinStack } from 'react-icons/bi';
import { FcViewDetails } from 'react-icons/fc';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../../Hooks/AxiosSecure/useAxiosSecure';

import { useState } from 'react';

const ManageTasks = () => {
  const [deatilsData, setDeatilsData] = useState({});
  const axiosSecure = useAxiosSecure();
  const { data, refetch } = useQuery({
    queryKey: ['manageTask'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/tasks-manages');
      return data;
    },
  });

  const handileClikDelete = (id, email, quantity, amount) => {
    const updateInfo = {
      quantity,
      amount,
    };
    console.log(updateInfo);
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
        axiosSecure.delete(`/task-deletes/${id}`).then(res => {
          if (res.data.deletedCount) {
            axiosSecure
              .patch(`/tsksCreator-tokenUpdate?email=${email}`, updateInfo)
              .then(res => {
                console.log(res.data);
              });

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

  const handileClickDeatils = id => {
    refetch;
    axiosSecure.get(`/tasksDeatils-modal/${id}`).then(res => {
      setDeatilsData(res?.data);
    });
  };

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
                      handileClickDeatils(
                        item?._id,
                        document.getElementById('my_modal_5').showModal()
                      )
                    }
                  >
                    <FcViewDetails className="text-3xl" />
                  </button>
                </td>
                <td>
                  <button
                    onClick={() =>
                      handileClikDelete(
                        item?._id,
                        item?.creator_email,
                        item?.task_quantity,
                        item?.payable_amount
                      )
                    }
                    className="rounded-full "
                  >
                    {' '}
                    <RiDeleteBin6Fill className="text-4xl bg-orange-600 text-white rounded-full p-1" />{' '}
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>

      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <div className="w-full">
            <div className="w-full ">
              <h2 className="text-center font-bold ">
                {deatilsData?.task_title}
              </h2>
              <p className="mb-4 text-xl font-bold text-green-500">
                {deatilsData?.task_detail}
              </p>
              <img
                className="w-full object-cover object-center  lg:h-[300px] md:h-[300px]"
                src={deatilsData?.task_image}
                alt=""
              />
            </div>
            <div className="mt-4">
              <p className="mt-4">
                submission info :{' '}
                <span className="font-semibold">
                  {deatilsData?.submission_info}
                </span>
              </p>
              <div className="flex justify-between">
                <h2 className="my-4">
                  Completion date : {deatilsData?.completion_date}
                </h2>

                <p className="my-3">
                  Task quantity : {deatilsData?.task_quantity} person
                </p>
              </div>
              <div className="flex justify-between">
                <p className="flex ">
                  Payable amount : {deatilsData?.payable_amount}{' '}
                  <BiSolidCoinStack className="text-2xl text-orange-400" />
                </p>
                <p className="">Current Time : {deatilsData?.current_time}</p>
              </div>
              <div>
                <hr className="my-7 border-dashed border-green-400" />

                <h2 className="my-3">
                  Creator Name : {deatilsData?.creator_name}
                </h2>
                <h2>Creator email : {deatilsData?.creator_email}</h2>
              </div>
            </div>
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ManageTasks;
