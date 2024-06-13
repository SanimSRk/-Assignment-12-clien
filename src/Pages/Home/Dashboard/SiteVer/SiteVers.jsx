import { useState } from 'react';
import { AiOutlineBars } from 'react-icons/ai';
import { BiMoneyWithdraw, BiSolidPurchaseTag } from 'react-icons/bi';
import { FaClipboardList, FaHome } from 'react-icons/fa';
import { FcSettings } from 'react-icons/fc';
import { GrLogout, GrTasks } from 'react-icons/gr';
import { MdAddTask, MdAddToPhotos, MdPayment, MdTaskAlt } from 'react-icons/md';
import { Link, NavLink } from 'react-router-dom';
import useUser from '../../../../Hooks/useUser';
import { PiUsersThreeFill } from 'react-icons/pi';
import useAuth from '../../../../Hooks/useAuth';

const SiteVers = () => {
  const [isActive, setActive] = useState(false);
  const { hanidleClickLogouts } = useAuth();
  const { data } = useUser();
  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };

  const logoutHandileClick = () => {
    hanidleClickLogouts()
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <div className="">
      <>
        {/* Small Screen Navbar */}
        <div className="bg-gray-100 text-gray-800 z-50 flex justify-between md:hidden">
          <div>
            <div className="block cursor-pointer p-4 font-bold">
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
          </div>

          <button
            onClick={handleToggle}
            className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200"
          >
            <AiOutlineBars className="h-5 w-5" />
          </button>
        </div>

        {/* Sidebar */}
        <div
          className={`z-10  md:fixed flex flex-col justify-between overflow-x-hidden bg-green-300 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
            isActive && '-translate-x-full'
          }  md:translate-x-0  transition duration-200 ease-in-out`}
        >
          <div>
            <div>
              <div className="w-full px-4 py-2 shadow-sm rounded-lg justify-center items-center  mx-auto">
                <Link to={'/'}>
                  <div className="flex items-center">
                    <img className="w-12" src="/askstream-logo.png" alt="" />
                    <a className=" text-2xl gap-0 font-bold text-white ">
                      <span className="text-white">T</span>ask
                      <span className="">Stream</span>
                    </a>
                  </div>
                </Link>
              </div>
            </div>

            {/* Nav Items */}
            <div className="flex flex-col justify-between flex-1 mt-6">
              {/* Conditional toggle button here.. */}

              {/*  Menu Items */}
              {data?.role === 'isAdmin' && (
                <nav>
                  <NavLink
                    to="adminHome"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-green-100   hover:text-gray-700 ${
                        isActive
                          ? 'bg-green-100  text-gray-700'
                          : 'text-[#333333]'
                      }`
                    }
                  >
                    <FaHome className="w-5 h-5" />

                    <span className="mx-4 font-medium">Home</span>
                  </NavLink>
                  <NavLink
                    to="manageUser"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-green-100   hover:text-gray-700 ${
                        isActive
                          ? 'bg-green-100  text-gray-700'
                          : 'text-[#333333]'
                      }`
                    }
                  >
                    <PiUsersThreeFill className="w-5 h-5" />

                    <span className="mx-4 font-medium">Manage Users</span>
                  </NavLink>
                  <NavLink
                    to="manegaTasks"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-green-100   hover:text-gray-700 ${
                        isActive
                          ? 'bg-green-100  text-gray-700'
                          : 'text-[#333333]'
                      }`
                    }
                  >
                    <GrTasks className="w-5 h-5" />
                    <span className="mx-4 font-medium">Manage Task</span>
                  </NavLink>
                </nav>
              )}
              {data?.role === 'worker' && (
                <nav>
                  <NavLink
                    to="workerHome"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-green-100   hover:text-gray-700 ${
                        isActive
                          ? 'bg-green-100  text-gray-700'
                          : 'text-[#333333] '
                      }`
                    }
                  >
                    <FaHome className="w-5 h-5" />

                    <span className="mx-4 font-medium">Home</span>
                  </NavLink>
                  <NavLink
                    to="taskList"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-green-100  hover:text-gray-700 ${
                        isActive
                          ? 'bg-green-100 text-gray-700'
                          : 'text-[#333333]'
                      }`
                    }
                  >
                    <FaClipboardList className="w-5 h-5" />

                    <span className="mx-4 font-medium"> TaskList</span>
                  </NavLink>
                  <NavLink
                    to="my-submission"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-green-100   hover:text-gray-700 ${
                        isActive
                          ? 'bg-green-100 text-gray-700'
                          : 'text-[#333333]'
                      }`
                    }
                  >
                    <MdAddTask className="w-5 h-5" />

                    <span className="mx-4 font-medium">My Submissions</span>
                  </NavLink>
                  <NavLink
                    to="withdrawals"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-green-100  hover:text-gray-700 ${
                        isActive
                          ? 'bg-green-100  text-gray-700'
                          : 'text-[#333333]'
                      }`
                    }
                  >
                    <BiMoneyWithdraw className="w-5 h-5" />
                    <span className="mx-4 font-medium">Withdrawals</span>
                  </NavLink>
                </nav>
              )}
              {data?.role === 'taskCreator' && (
                <nav>
                  {/* Home section */}
                  <NavLink
                    to="creatorHome"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-green-100  hover:text--700 ${
                        isActive
                          ? 'bg-green-100  text-gray-700'
                          : 'text-[#333333]'
                      }`
                    }
                  >
                    <FaHome className="w-5 h-5" />

                    <span className="mx-4 font-medium">Home</span>
                  </NavLink>

                  {/* Add new tasks */}
                  <NavLink
                    to="addTasks"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-green-100   hover:text-gray-700 ${
                        isActive
                          ? 'bg-green-100 text-gray-700'
                          : 'text-[#333333]'
                      }`
                    }
                  >
                    <MdAddToPhotos className="w-5 h-5" />

                    <span className="mx-4 font-medium">Add new Tasks</span>
                  </NavLink>
                  {/* My Listing task */}
                  <NavLink
                    to="myTasks"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-green-100   hover:text-gray-700 ${
                        isActive
                          ? 'bg-green-100  text-gray-700'
                          : 'text-[#333333]'
                      }`
                    }
                  >
                    <MdTaskAlt className="w-5 h-5" />

                    <span className="mx-4 font-medium">My Tasks</span>
                  </NavLink>
                  {/*Purchase Coin */}
                  <NavLink
                    to="purchas"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-green-100  hover:text-gray-700 ${
                        isActive
                          ? 'bg-green-100  text-gray-700'
                          : 'text-[#333333]'
                      }`
                    }
                  >
                    <BiSolidPurchaseTag className="w-5 h-5" />
                    <span className="mx-4 font-medium">Purchase Coin</span>
                  </NavLink>
                  {/* My payment hostry */}
                  <NavLink
                    to="paymentHistorys"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-green-100   hover:text-gray-700 ${
                        isActive
                          ? 'bg-green-100  text-gray-700'
                          : 'text-[#333333]'
                      }`
                    }
                  >
                    <MdPayment className="w-5 h-5" />
                    <span className="mx-4 font-medium">Payment history</span>
                  </NavLink>
                </nav>
              )}
            </div>
          </div>

          <div>
            <hr />

            {/* Profile Menu */}

            <button
              onClick={logoutHandileClick}
              className="flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform"
            >
              <GrLogout className="w-5 h-5" />

              <span className="mx-4 font-medium">Logout</span>
            </button>
          </div>
        </div>
      </>
    </div>
  );
};

export default SiteVers;
