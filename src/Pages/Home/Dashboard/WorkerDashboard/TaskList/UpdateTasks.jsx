import { useForm } from 'react-hook-form';
import { useLoaderData } from 'react-router-dom';
import useAxiosPublice from '../../../../../Hooks/AxiosPublic/useAxiosPublice';
import Swal from 'sweetalert2';

const UpdateTasks = () => {
  const loderdata = useLoaderData();
  const axiosPublice = useAxiosPublice();
  const { task_title, task_detail, submission_info, _id } = loderdata;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    const { task_title, task_detail, submission_info } = data;
    const updateInfo = { task_title, task_detail, submission_info };

    axiosPublice.put(`/tasks-updates/${_id}`, updateInfo).then(res => {
      if (res.data.matchedCount) {
        Swal.fire({
          position: 'top-center',
          icon: 'success',
          title: 'Suscess fully updated done ',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  return (
    <div>
      <div className="w-3/4 border-2 border-green-500 mx-auto my-[100px] shadow-lg py-[72px] px-[80px]">
        <h2 className="text-3xl font-bold text-center ">
          <span className="text-green-400">Up</span>date Tasks
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-4 mt-7">
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text">Task_title</span>
              </label>
              <input
                type="text"
                placeholder="task_title
"
                defaultValue={task_title}
                className="input input-bordered"
                required
                {...register('task_title', { required: true })}
              />
            </div>
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text">Task_detail</span>
              </label>
              <input
                type="text"
                placeholder="Enter task_detail"
                defaultValue={task_detail}
                className="input input-bordered"
                required
                {...register('task_detail', { required: true })}
              />
            </div>
          </div>
          <div className="form-control w-full mt-4">
            <label className="label">
              <span className="label-text">Submission info</span>
            </label>
            <input
              type="text"
              placeholder="Enter submission_info"
              className="input input-bordered"
              defaultValue={submission_info}
              required
              {...register('submission_info', { required: true })}
            />
          </div>
          <input
            className="text-white btn w-full mt-6 bg-green-500"
            type="submit"
            value="Update Task"
          />
        </form>
      </div>
    </div>
  );
};

export default UpdateTasks;
