import { Link, NavLink } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';

const Naver = () => {
  const { user, hanidleClickLogouts } = useAuth();
  const naviLinks = (
    <>
      <NavLink
        to={'/'}
        className={({ isActive }) =>
          isActive
            ? 'px-4  py-2  text-green-400 text-xl font-extrabold'
            : 'font-extrabold px-4  py-2 text-xl'
        }
      >
        Home
      </NavLink>
      <NavLink
        to={'/'}
        className={({ isActive }) =>
          isActive
            ? 'px-4  py-2  text-green-400 text-xl font-extrabold'
            : 'font-extrabold px-4  py-2 text-xl'
        }
      >
        Watch Demo
      </NavLink>
      {user && (
        <NavLink
          to={'/'}
          className={({ isActive }) =>
            isActive
              ? 'px-4  py-2  text-green-400 text-xl font-extrabold'
              : 'font-extrabold px-4  py-2 text-xl'
          }
        >
          Dashboard
        </NavLink>
      )}
    </>
  );

  const handileLogout = () => {
    hanidleClickLogouts()
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {naviLinks}
            </ul>
          </div>
          <Link to={'/'}>
            <div className="flex items-center">
              <img className="w-12" src="/askstream-logo.png" alt="" />
              <a className=" text-2xl gap-0 font-bold ">
                <span className="text-green-500 ">T</span>ask
                <span className="text-green-400">Stream</span>
              </a>
            </div>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1"> {naviLinks}</ul>
        </div>
        <div className="navbar-end gap-4">
          {user ? (
            <>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img src={user.photoURL} />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <a className="justify-between">
                      {user.displayName}
                      <span className="badge">New</span>
                    </a>
                  </li>

                  <li>
                    <a>Settings</a>
                  </li>
                  <li onClick={handileLogout}>
                    <a>Logout</a>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <Link to={'/login'}>
                <button className="font-semibold btn bg-green-400 text-white">
                  Login
                </button>
              </Link>

              <Link to={'/register'}>
                <button className="font-semibold btn bg-green-400 text-white">
                  Register
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Naver;
