import { useForm } from 'react-hook-form';
import { useLoaderData } from 'react-router-dom';
import useAuth from '../../../../../Hooks/useAuth';
import { BiSolidCoinStack } from 'react-icons/bi';
import useAxiosPublice from '../../../../../Hooks/AxiosPublic/useAxiosPublice';
import Swal from 'sweetalert2';
import useUser from '../../../../../Hooks/useUser';
import Countdown from 'react-countdown';
import useAxiosSecure from '../../../../../Hooks/AxiosSecure/useAxiosSecure';
const TasksDeatils = () => {
  const datas = useLoaderData();
  const { user } = useAuth();
  const { data, refetch } = useUser();
  const axiosSecure = useAxiosSecure();
  const worker_name = user?.displayName;
  const worker_email = user?.email;

  let current_time = new Date();
  let dd = current_time.getDate();
  let mm = current_time.getMonth() + 1;
  let yyyy = current_time.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  current_time = dd + '/' + mm + '/' + yyyy;
  const {
    task_title,
    task_detail,
    payable_amount,
    completion_date,
    submission_info,
    task_image,
    creator_email,
    creator_name,
    _id,
  } = datas;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    const submission_details = data?.submission_details;
    const task_id = _id;
    const status = 'pending';

    const submitInfo = {
      task_id,
      task_title,
      task_detail,
      payable_amount,
      completion_date,
      submission_info,
      task_image,
      creator_email,
      creator_name,
      current_time,
      worker_email,
      worker_name,
      submission_details,
      status,
    };

    axiosSecure.post('/tasks-submit', submitInfo).then(res => {
      if (res.data.insertedId) {
        axiosSecure.patch(`/drcress-quantity/${_id}`).then(res => {
          console.log(res.data);
          if (res.data.modifiedCount) {
            Swal.fire({
              position: 'top-center',
              icon: 'success',
              title: 'Suscess fully tasks submit',
              showConfirmButton: false,
              timer: 1500,
            });
            refetch();
          }
        });
      }
    });
  };
  const Completionist = () => <span>You are good to go!</span>;
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <span className="text-xl font-bold">
          {days}:{hours}:{minutes}:{seconds}
        </span>
      );
    }
  };

  return (
    <div className=" bg-green-50 py-8">
      <div className="lg:w-4/5 mx-auto md:w-4/5 bg-base-100  p-8  border-2 shadow-md border-green-400">
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="">
              <div className="w-full ]">
                <h2 className="text-center font-bold ">{task_title}</h2>
                <p className="mb-4 text-2xl font-bold text-green-500">
                  {task_detail}
                </p>
                <img
                  className="w-full object-cover object-center  lg:h-[370px] md:h-[300px]"
                  src={task_image}
                  alt=""
                />
              </div>
              <div className="mt-4">
                <p className="mt-4">
                  submission info :{' '}
                  <span className="font-semibold">{submission_info}</span>
                </p>
                <div className="flex justify-between items-center">
                  <h2 className="my-4">Completion date : {completion_date}</h2>

                  <Countdown date={completion_date} renderer={renderer} />
                </div>
                <div className="flex justify-between">
                  <p className="flex ">
                    Payable amount : {payable_amount}{' '}
                    <BiSolidCoinStack className="text-2xl text-orange-400" />
                  </p>
                  <p className="">Current Time : {current_time}</p>
                </div>
                <div>
                  <hr className="my-7 border-dashed border-green-400" />

                  <h2 className="my-3">Creator Name : {creator_name}</h2>
                  <h2>Creator email : {creator_email}</h2>
                </div>
              </div>

              <div className="form-control w-full mt-6">
                <label className="label">
                  <span className="label-text">Submission details</span>
                </label>
                <textarea
                  placeholder="giv me tasks submission details"
                  className="textarea textarea-bordered border-green-300 textarea-lg w-full "
                  {...register('submission_details', { required: true })}
                ></textarea>
              </div>
            </div>
            <input
              className="btn text-white w-full mt-4 bg-green-500"
              type="submit"
              value="Submission"
            />
          </form>
        </>
      </div>
    </div>
  );
};

export default TasksDeatils;
