import { useForm } from 'react-hook-form';
import { useLoaderData } from 'react-router-dom';
import useAuth from '../../../../../Hooks/useAuth';
const TasksDeatils = () => {
  const datas = useLoaderData();
  const { user } = useAuth();
  const {
    task_title,
    task_detail,
    task_quantity,
    payable_amount,
    completion_date,
    submission_info,
    task_image,
    creator_email,
    creator_name,
    current_time,
  } = datas;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <div className=" bg-base-200 py-8">
      <div className="lg:w-4/5 mx-auto md:w-4/5 bg-green-50  p-8  border-2 shadow-md border-green-400">
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="">
              <div className="w-full ]">
                <img
                  className="w-full object-cover object-center  lg:h-[370px] md:h-[300px]"
                  src={task_image}
                  alt=""
                />
              </div>
              <div className="mt-4">
                <h2>{task_title}</h2>
                <h2 className="my-3">{completion_date}</h2>

                <p className="">{task_detail}</p>
                <p className="mt-4">location: {submission_info}</p>

                <p className="my-3">Need Volunteer : {task_quantity} person</p>
                <p className="">Deadline : {current_time}</p>
                <div>
                  <h2 className="my-3">Organizer name : {creator_name}</h2>
                  <h2>Organizer email : {creator_email}</h2>
                </div>
              </div>
              <div className="flex gap-4 my-3">
                <div className="form-control w-1/2">
                  <label className="label">
                    <span className="label-text">Your Name</span>
                  </label>
                  <div className="input-bordered input grid justify-center items-center">
                    {user?.displayName}
                  </div>
                </div>
                <div className="form-control w-1/2">
                  <label className="label">
                    <span className="label-text">Your Email</span>
                  </label>
                  <div className="input-bordered input grid justify-center items-center">
                    {user?.email}
                  </div>
                </div>
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Suggestion</span>
                </label>
                <textarea
                  placeholder="giv me suggestion"
                  className="textarea textarea-bordered textarea-lg w-full "
                  {...register('suggestion', { required: true })}
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
