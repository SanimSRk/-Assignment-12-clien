import { FaCoins } from 'react-icons/fa';
import useUser from '../../../../Hooks/useUser';

import { IoNotifications } from 'react-icons/io5';

const DasbordUser = () => {
  const { data } = useUser();

  return (
    <div className="lg:ml-64  justify-end flex gap-8 mt-3 items-center text-center">
      <div>
        <button className="text-3xl items-center gap-2 flex text-orange-300 font-bold">
          {' '}
          {data?.coin}
          <FaCoins className=" text-3xl"></FaCoins>
        </button>

        <h2>{data?.role}</h2>
      </div>
      <div className="">
        <img className="w-12 rounded-full" src={data?.image} alt="" />
        <h2>{data?.fullName}</h2>
      </div>

      <div>
        <IoNotifications className="text-3xl" />
      </div>
    </div>
  );
};

export default DasbordUser;
