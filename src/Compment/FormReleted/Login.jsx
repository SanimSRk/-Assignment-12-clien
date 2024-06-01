import { FcGoogle } from 'react-icons/fc';

const Login = () => {
  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content w-full md:w-3/4 lg:w-[40%] flex-col lg:flex-row-reverse">
          <div className="card shrink-0 w-full shadow-2xl bg-base-100 border-green-400 border-2">
            <form className="card-body">
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
              <button className="w-full btn text-xl border-green-400">
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
