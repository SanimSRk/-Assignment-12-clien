import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import useAuth from '../../Hooks/useAuth';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosPublice from '../../Hooks/AxiosPublic/useAxiosPublice';
import Swal from 'sweetalert2';
import { useState } from 'react';

const Registration = () => {
  const { handileClikeCreateUser, handileUpdateUser, handileClickLoginUser } =
    useAuth();
  const axiosPublice = useAxiosPublice();
  const [coin, setCoin] = useState();

  const location = useLocation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    const { fullName, email, photo, password, role } = data;

    const img = photo[0];
    const formData = new FormData();
    formData.append('image', img);

    let coin = 10;
    if (role === 'worker') {
      setCoin(10);
    } else if (role === 'taskCreator') {
      setCoin(50);
    }

    handileClikeCreateUser(email, password)
      .then(res => {
        console.log(res.user);
        if (res.user) {
          axios
            .post(
              `https://api.imgbb.com/1/upload?key=${
                import.meta.env.VITE_IMG_HOSTING_KEY
              }`,
              formData
            )
            .then(res => {
              const image = res?.data?.data?.display_url;

              const userInfo = {
                image,
                fullName,
                email,
                role,
                coin: parseInt(coin),
              };
              console.log(userInfo);
              handileUpdateUser(fullName, image).then(() => {
                axiosPublice.post('/users', userInfo).then(res => {
                  console.log(res.data);
                  if (res.data.insertedId) {
                    Swal.fire({
                      position: 'top-end',
                      icon: 'success',
                      title: 'Suscess fully registration done ',
                      showConfirmButton: false,
                      timer: 1500,
                    });
                    navigate(location.state || '/');
                  }
                });
              });
            });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handileGoogleLoging = () => {
    handileClickLoginUser()
      .then(res => {
        console.log(res.user);
        if (res.user) {
          navigate(location.state || '/');
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content w-full md:w-3/4 lg:w-[40%] flex-col lg:flex-row-reverse">
          <div className="card shrink-0 w-full shadow-2xl bg-base-100 border-green-400 border-2">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <h2 className="text-3xl text-center font-bold text-green-400">
                Registration Now
              </h2>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Your Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="input input-bordered border-green-400"
                  required
                  {...register('fullName', { required: true })}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered border-green-400"
                  required
                  {...register('email', { required: true })}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Profile URL...</span>
                </label>
                <input
                  type="file"
                  name=""
                  id=""
                  placeholder="Profile Picture URL"
                  required
                  {...register('photo', { required: true })}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered border-green-400"
                  required
                  {...register('password', { required: true })}
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <label className="label">
                <span className="label-text">Select your role</span>
              </label>
              <select
                className="select select-bordered w-full border-green-400"
                required
                {...register('role', { required: true })}
              >
                <option disabled selected>
                  Select your role
                </option>
                <option>worker</option>
                <option>taskCreator</option>
              </select>
              <div className="form-control mt-6">
                <button className="btn bg-green-400 text-white">
                  Registration
                </button>
              </div>
            </form>
            <div className="flex flex-col w-full mb-6 border-opacity-50 px-8">
              <div className="divider">OR</div>
              <button
                onClick={handileGoogleLoging}
                className="w-full btn text-xl border-green-400"
              >
                <FcGoogle className="text-3xl" />
                sign in with google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
