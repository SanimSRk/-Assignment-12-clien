import { FcGoogle } from 'react-icons/fc';
import Swal from 'sweetalert2';
import useAuth from '../../Hooks/useAuth';
import useAxiosPublice from '../../Hooks/AxiosPublic/useAxiosPublice';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
  const { handileClickGoogleSing, handileClickLoginUser } = useAuth();
  const axiosPublice = useAxiosPublice();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    console.log(data);
    const { email, password } = data;
    handileClickLoginUser(email, password)
      .then(res => {
        console.log(res.user);
        Swal.fire({
          position: 'top-center',
          icon: 'success',
          title: 'Suscess fully registration done ',
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(location.state || '/');
      })
      .catch(error => {
        console.log(error);
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
            console.log(res.data);
            if (res.data.insertedId) {
              Swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'Suscess fully registration done ',
                showConfirmButton: false,
                timer: 1500,
              });
            }
            navigate(location.state || '/');
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
                Login Now
              </h2>

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

              <div className="form-control mt-6">
                <button className="btn bg-green-400 text-white">Login</button>
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

export default Login;
