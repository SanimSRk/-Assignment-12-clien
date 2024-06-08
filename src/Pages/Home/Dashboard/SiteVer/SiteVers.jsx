import { useState } from 'react';
import { BiMenu, BiMoneyWithdraw, BiSolidPurchaseTag } from 'react-icons/bi';
import { FaClipboardList, FaHome } from 'react-icons/fa';
import { MdAddTask, MdAddToPhotos, MdPayment, MdTaskAlt } from 'react-icons/md';
import { Link, NavLink } from 'react-router-dom';
import useUser from '../../../../Hooks/useUser';
import { PiUsersThreeFill } from 'react-icons/pi';

const SiteVers = () => {
  const [isActive, setActive] = useState(false);
  const { data } = useUser();
  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };
  return (
    <div className="">
      <div className="drawer lg:drawer-open fixed z-10  lg:-ml-7  ">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="  flex  items-center ml-4 h-16   lg:hidden ">
          {/* Page content here */}
          <label htmlFor="my-drawer-2" className="btn  lg:hidden">
            <BiMenu className="text-3xl"></BiMenu>
          </label>
        </div>
        <div className="drawer-side ">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4  w-64 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <div
              className={`z-10   md:fixed flex flex-col justify-between overflow-x-hidden bg-green-400 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
                isActive && '-translate-x-full'
              }  md:translate-x-0  transition duration-200 ease-in-out`}
            >
              <div>
                <div>
                  <div className="w-full hidden  md:flex px-4 py-2 shadow-sm rounded-lg justify-center items-center  mx-auto">
                    <Link to={'/'}>
                      <div className="flex items-center">
                        <img
                          className="w-12"
                          src="/askstream-logo.png"
                          alt=""
                        />
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
                              : 'text-gray-600'
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
                              : 'text-gray-600'
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
                              : 'text-gray-600'
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
                              : 'text-gray-600'
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
                              : 'text-gray-600'
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
                              : 'text-gray-600'
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
                              : 'text-gray-600'
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
                              : 'text-gray-600'
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
                              : 'text-gray-600'
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
                              : 'text-gray-600'
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
                              : 'text-gray-600'
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
                              : 'text-gray-600'
                          }`
                        }
                      >
                        <MdPayment className="w-5 h-5" />
                        <span className="mx-4 font-medium">
                          Payment history
                        </span>
                      </NavLink>
                    </nav>
                  )}
                </div>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SiteVers;
