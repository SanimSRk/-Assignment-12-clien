import { useQuery } from '@tanstack/react-query';
import { BiSolidCoinStack } from 'react-icons/bi';
import { FcViewDetails } from 'react-icons/fc';
import useAuth from '../../../../Hooks/useAuth';
import Swal from 'sweetalert2';
import useUser from '../../../../Hooks/useUser';
import { MdPaid, MdPendingActions } from 'react-icons/md';
import useAxiosSecure from '../../../../Hooks/AxiosSecure/useAxiosSecure';

const CreatorHome = () => {
  const { user, loding } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data } = useUser();
  const { data: dataCard, refetch } = useQuery({
    queryKey: [user?.email, 'review'],
    enabled: !loding && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/submit-reviews?creator_email=${user?.email}`
      );
      return data;
    },
  });

  const { data: payments } = useQuery({
    queryKey: [user?.email, 'worker-Payments'],
    enabled: !loding && !!user?.email && !!localStorage.getItem('token'),
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `approve-tasksAll?email=${user?.email}`
      );
      return data;
    },
  });

  console.log(payments);
  const handileclickApprobe = (id, email, amount) => {
    axiosSecure.patch(`/status-approve/${id}`).then(res => {
      if (res.data.matchedCount) {
        const amountIfo = { amount: amount };
        axiosSecure
          .patch(`/increase-userCoin?worker_email=${email}`, amountIfo)
          .then(res => {
            console.log(res.data);
            if (res.data.matchedCount) {
              Swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'users tasks is approve',
                showConfirmButton: false,
                timer: 1500,
              });
              refetch();
            }
          });
      }
    });
  };

  const handileClickReject = id => {
    axiosSecure.patch(`/reject-userTasks/${id}`).then(res => {
      if (res.data.matchedCount) {
        Swal.fire({
          position: 'top-center',
          icon: 'success',
          title: 'users tasks is rejected',
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
    });
  };

  return (
    <div className="mt-12">
      <div>
        <div className="lg:flex md:flex gap-12 justify-between">
          <div className="stat shadow">
            <div className="stat-figure text-primary">
              <BiSolidCoinStack className="text-3xl"></BiSolidCoinStack>
            </div>
            <div className="stat-title">Total Coins</div>
            <div className="stat-value text-primary">{data?.coin}</div>
            <div className="stat-desc">21% more than last month</div>
          </div>

          <div className="stat shadow">
            <div className="stat-figure text-secondary">
              <MdPendingActions className="text-3xl" />
            </div>
            <div className="stat-title">Pending Tasks</div>
            <div className="stat-value text-secondary">
              {dataCard?.length || 0}
            </div>
            <div className="stat-desc">21% more than last month</div>
          </div>

          <div className="stat shadow">
            <div className="stat-figure text-orange-600">
              <MdPaid className="text-4xl" />
            </div>
            <div className="stat-title">Total payment paid by user</div>
            <div className="stat-value">{payments?.result}</div>

            <div className="stat-desc text-secondary">
              remaining payment paid by user
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2 className="mt-16 text-center text-2xl font-bold text-green-500">
          Review of Worker Earnings and Submissions
        </h2>
      </div>
      <div>
        <div
          className="overflow-x-auto mt-8
        "
        >
          <table className="table">
            {/* head */}
            <thead className="bg-green-400 font-semibold text-white ">
              <tr>
                <th></th>
                <th>worker_name</th>
                <th>worker_email</th>
                <th>Title</th>
                <th>Amount</th>
                <th>Deatils</th>
                <th>Approve</th>
                <th>Reject</th>
                <th></th>
              </tr>
            </thead>
            {dataCard?.map((item, index) => (
              <tbody key={item._id}>
                {/* row 1 */}
                <tr>
                  <th>{index + 1}</th>
                  <td>{item?.worker_name}</td>
                  <td>{item?.worker_email}</td>
                  <td>{item?.task_title}</td>
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
                      <div className="modal-box ">
                        <div className="w-full">
                          <div className="w-full ">
                            <h2 className="text-center font-bold ">
                              {item?.task_title}
                            </h2>
                            <p className="mb-4 text-xl font-bold text-green-500">
                              {item?.task_detail}
                            </p>
                            <img
                              className="w-full object-cover object-center  lg:h-[300px] md:h-[300px]"
                              src={item?.task_image}
                              alt=""
                            />
                          </div>
                          <div className="mt-4">
                            <p className="mt-4">
                              submission info :{' '}
                              <span className="font-semibold">
                                {item?.submission_info}
                              </span>
                            </p>
                            <div className="flex justify-between">
                              <h2 className="my-4">
                                Completion date : {item?.completion_date}
                              </h2>

                              <p className="my-3">
                                Task quantity : {item?.task_quantity} person
                              </p>
                            </div>
                            <div className="flex justify-between">
                              <p className="flex ">
                                Payable amount : {item?.payable_amount}{' '}
                                <BiSolidCoinStack className="text-2xl text-orange-400" />
                              </p>
                              <p className="">
                                Current Time : {item?.current_time}
                              </p>
                            </div>
                            <div>
                              <hr className="my-7 border-dashed border-green-400" />

                              <h2 className="my-3">
                                Creator Name : {item?.creator_name}
                              </h2>
                              <h2>Creator email : {item?.creator_email}</h2>
                            </div>
                          </div>
                        </div>
                      </div>
                      <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                      </form>
                    </dialog>
                  </td>
                  <td>
                    <button
                      onClick={() =>
                        handileclickApprobe(
                          item?._id,
                          item.worker_email,
                          item?.payable_amount
                        )
                      }
                      className="bg-green-100  rounded-3xl font-bold btn text-green-600"
                    >
                      Approve
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handileClickReject(item?._id)}
                      className=" rounded-3xl font-bold btn bg-red-100 text-red-700"
                    >
                      Reject
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

export default CreatorHome;
