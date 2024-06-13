import { FaCoins } from 'react-icons/fa';
import useUser from '../../../../Hooks/useUser';

import { IoNotifications } from 'react-icons/io5';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../../Hooks/useAuth';
import useAxiosSecure from '../../../../Hooks/AxiosSecure/useAxiosSecure';

const DasbordUser = () => {
  const { data } = useUser();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: notficationData } = useQuery({
    queryKey: [user?.email, 'notfication-data'],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/notifaction-shows?email=${user?.email}`
      );
      return data;
    },
  });
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
        <IoNotifications
          onClick={() => document.getElementById('my_modal_2').showModal()}
          className="text-3xl cursor-pointer"
        />
      </div>

      <div>
        {/* Open the modal using document.getElementById('ID').showModal() method */}

        <dialog id="my_modal_2" className="modal">
          <div className="modal-box">
            {notficationData?.map(items => (
              <div key={items._id}>
                <p className="bg-base-200 mt-4 p-2 rounded-lg">
                  {items?.message}
                </p>
              </div>
            ))}
            <p className="py-4">Press ESC key or click outside to close</p>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
    </div>
  );
};

export default DasbordUser;
