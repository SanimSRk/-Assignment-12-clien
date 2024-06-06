import axios from 'axios';
import { useForm } from 'react-hook-form';
import useAuth from '../../../../../Hooks/useAuth';
import useAxiosPublice from '../../../../../Hooks/AxiosPublic/useAxiosPublice';
import Swal from 'sweetalert2';
import { DateRange } from 'react-date-range';
import { useState } from 'react';

const AddTask = () => {
  const { user } = useAuth();
  const axiosPublice = useAxiosPublice();

  const creator_email = user?.email;
  const creator_name = user?.displayName;
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
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    const {
      task_title,
      task_detail,
      task_quantity,
      payable_amount,
      completion_date,
      submission_info,
      image,
    } = data;
    const img = image[0];
    const formData = new FormData();
    formData.append('image', img);

    axios
      .post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMG_HOSTING_KEY
        }`,
        formData
      )
      .then(res => {
        console.log(res.data);
        const task_image = res?.data?.data?.display_url;
        const tasks = {
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
        };

        if (res?.data?.data?.display_url) {
          axiosPublice.post('/alltasks', tasks).then(res => {
            console.log(res.data);
            if (res.data.insertedId) {
              Swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'Suscess fully tasks added',
                showConfirmButton: false,
                timer: 1500,
              });
            }
            if (res?.data?.message === 'notAvailable') {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Not available Coin. Purchase Coin',
              });
            }
          });
        }
      })
      .catch(error => {
        console.log(error);
      });

    console.log(data);
  };
  return (
    <div>
      <div className="w-3/4 mx-auto my-[100px] shadow-lg py-[72px] px-[80px]">
        <h2 className="text-3xl font-bold text-center ">
          <span className="text-green-400">Add</span> Your Product
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
                className="input input-bordered"
                required
                {...register('task_detail', { required: true })}
              />
            </div>
          </div>
          <div className="flex gap-4 my-3">
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text">Task_quantity</span>
              </label>
              <input
                type="text"
                placeholder="Enter task_quantity"
                className="input input-bordered"
                required
                {...register('task_quantity', { required: true })}
              />
            </div>
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text"> Payable_amount </span>
              </label>
              <input
                type="text"
                placeholder="Enter payable_amount"
                className="input input-bordered"
                required
                {...register('payable_amount', { required: true })}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text">Completion_date</span>
              </label>
              <input
                type="date"
                name=""
                id=""
                className="input input-bordered"
                {...register('completion_date', { required: true })}
              />
            </div>
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text">Submission_info</span>
              </label>
              <input
                type="text"
                placeholder="Enter submission_info"
                className="input input-bordered"
                required
                {...register('submission_info', { required: true })}
              />
            </div>
          </div>
          <div className="form-control w-full mt-2">
            <label className="label">
              <span className="label-text">Task_image_url</span>
            </label>
            <input
              type="file"
              placeholder="Enter task_image_url"
              className="input "
              required
              {...register('image', { required: true })}
            />
          </div>
          <input
            className="text-white btn w-full mt-6 bg-green-500"
            type="submit"
            value="Add Task"
          />
        </form>
      </div>
    </div>
  );
};

export default AddTask;
