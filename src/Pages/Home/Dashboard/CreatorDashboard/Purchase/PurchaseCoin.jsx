import { useEffect, useState } from 'react';
import { CiCoinInsert } from 'react-icons/ci';
import useAxiosPublice from '../../../../../Hooks/AxiosPublic/useAxiosPublice';
import { Link } from 'react-router-dom';

const PurchaseCoin = () => {
  const [datas, setData] = useState([]);
  const axiosPublice = useAxiosPublice();
  useEffect(() => {
    axiosPublice.get('/buyCart').then(res => {
      setData(res.data);
    });
  }, []);

  return (
    <div>
      <div className="lg:w-2/3 md:w-2/3 mx-auto text-center">
        <h2 className="text-2xl font-bold text-green-500">
          This is Purchase section
        </h2>
        <p className="mt-3">
          Welcome to our coin purchase section! Here, you can choose from a
          variety of coin packages to enhance your experience on our platform.
        </p>
      </div>
      <div className="grid lg:grid-cols-3 mt-12 text-black gap-6 md:grid-cols-2 grid-cols-1">
        {datas?.map(items => (
          <Link key={items._id} to={`/dashboard/payments/${items._id}`}>
            <div className="shadow-lg bg-green-100 text-green-800 rounded-lg cursor-pointer  p-6">
              <h2>{items?.description}</h2>
              <div className="flex justify-between mt-3">
                <h2 className="flex items-center">
                  {items?.coins}{' '}
                  <CiCoinInsert className="text-2xl text-orange-400"></CiCoinInsert>{' '}
                </h2>
                <h2>{items?.price} usd</h2>
              </div>
              <p className="mt-4">{items?.purchase_description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PurchaseCoin;
