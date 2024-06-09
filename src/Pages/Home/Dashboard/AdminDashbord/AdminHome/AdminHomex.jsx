import { useQuery } from '@tanstack/react-query';
import useAxiosPublice from '../../../../../Hooks/AxiosPublic/useAxiosPublice';
import { BiUser } from 'react-icons/bi';
import { FaUserShield } from 'react-icons/fa';

const AdminHomex = () => {
  const axiosPublice = useAxiosPublice();
  const { data } = useQuery({
    queryKey: ['status-admin'],
    queryFn: async () => {
      const { data } = await axiosPublice.get('/admin-status');
      return data;
    },
  });
  console.log(data);
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-8 h-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
            </div>
            <div className="stat-title">Page Views</div>
            <div className="stat-value text-secondary">2.6M</div>
            <div className="stat-desc">21% more than last month</div>
          </div>

          <div className="stat shadow">
            <div className="stat-figure text-secondary">
              <div className="avatar online">
                <div className="w-16 rounded-full">
                  <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
              </div>
            </div>
            <div className="stat-value">86%</div>
            <div className="stat-title">Tasks done</div>
            <div className="stat-desc text-secondary">31 tasks remaining</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHomex;
