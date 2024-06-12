import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import useAuth from '../../Hooks/useAuth';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosPublice from '../../Hooks/AxiosPublic/useAxiosPublice';
import Swal from 'sweetalert2';
import { useState } from 'react';
import useUser from '../../Hooks/useUser';
import Select from 'react-select';
const Registration = () => {
  const {
    handileClikeCreateUser,
    handileUpdateUser,

    handileClickGoogleSing,
  } = useAuth();
  const axiosPublice = useAxiosPublice();
  const { data: errorrData, refetch } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setErrors] = useState('');
  const [errorsss, setErrorsss] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const options = [
    { value: 'taskCreator', label: 'taskCreator' },
    { value: 'worker', label: 'worker' },
  ];

  const role = selectedOption?.value;
  let coin = 0;
  if (selectedOption?.value === 'worker') {
    coin = 10;
  } else if (selectedOption?.value === 'taskCreator') {
    coin = 50;
  }
  console.log(role, coin);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    const { fullName, email, photo, password } = data;

    const img = photo[0];
    const formData = new FormData();
    formData.append('image', img);

    if (password.length < 6) {
      setErrors('Password should be at least 6 characters');
      return;
    } else if (!/[A-Z]/.test(password)) {
      setErrors('Password does not have at least one uppercase letter');
      return;
    } else if (!/[a-z]/.test(password)) {
      setErrors('Password does not have at least one lowercase letter');
      return;
    } else {
      setErrors(null);
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
                coin,
              };
              console.log(userInfo);
              handileUpdateUser(fullName, image).then(() => {
                axiosPublice.post('/users', userInfo).then(res => {
                  if (res.data.insertedId) {
                    Swal.fire({
                      position: 'top-center',
                      icon: 'success',
                      title: 'Suscess fully registration done ',
                      showConfirmButton: false,
                      timer: 1500,
                    });
                    refetch();
                    navigate(location.state || '/');
                    setErrorsss(null);
                  }
                });
              });
            });
        }
      })
      .catch(error => {
        console.log(error);
        setErrorsss(error.message);
      });
  };

  const handileGoogleLoging = () => {
    handileClickGoogleSing()
      .then(res => {
        const email = res?.user?.email;
        const fullName = res?.user?.displayName;
        const image = res?.user?.photoURL;
        const role = 'worker';
        const coin = 10;
        const userInfo = { email, fullName, image, role, coin };
        if (res.user) {
          axiosPublice.post('/users', userInfo).then(res => {
            if (res.data.insertedId) {
              Swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'Suscess fully registration done ',
                showConfirmButton: false,
                timer: 1500,
              });
              navigate(location.state || '/');
            }
          });
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
                <p className="text-center font-semibold text-red-500">
                  {error}
                </p>
              </div>
              <label className="label">
                <span className="label-text">Select Your Role</span>
              </label>
              <Select
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
              />

              <div className="form-control mt-6">
                <p className="text-red-500 mb-2 font-semibold">{errorsss}</p>
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
