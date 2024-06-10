import { useQuery } from '@tanstack/react-query';
import useAxiosPublice from '../../../../../Hooks/AxiosPublic/useAxiosPublice';
import { BiSolidCoinStack, BiUser } from 'react-icons/bi';
import { TbCoinFilled } from 'react-icons/tb';
import AdminHomeTabile from './AdminHomeTabile';

const AdminHomex = () => {
  const axiosPublice = useAxiosPublice();
  const { data } = useQuery({
    queryKey: ['status-admin'],
    queryFn: async () => {
      const { data } = await axiosPublice.get('/admin-status');
      return data;
    },
  });

  return (
    <div className="mt-12">
      <div>
        <div className="lg:flex md:flex gap-12 justify-between">
          <div className="stat shadow">
            <div className="stat-figure text-primary">
              <BiUser className="text-3xl"></BiUser>
            </div>
            <div className="stat-title">Total Users</div>
            <div className="stat-value text-primary my-4">
              {data?.tottalUers}
            </div>
            <div className="stat-desc">21% more than last month</div>
          </div>

          <div className="stat shadow">
            <div className="stat-figure text-secondary">
              <BiSolidCoinStack className="text-3xl" />
            </div>
            <div className="stat-title"> Total coins</div>
            <div className="stat-value text-secondary">{data?.totals}</div>
            <div className="stat-desc">21% more than last month</div>
          </div>

          <div className="stat shadow">
            <div className="stat-figure text-orange-400">
              <TbCoinFilled className="text-3xl" />
            </div>
            <div className="stat-title">Total payments</div>
            <div className="stat-value">{data?.payments}</div>
            <div className="stat-desc text-secondary">
              approve tasks payment remaining
            </div>
          </div>
        </div>
      </div>
      <div>
        <AdminHomeTabile></AdminHomeTabile>
      </div>
    </div>
  );
};

export default AdminHomex;
