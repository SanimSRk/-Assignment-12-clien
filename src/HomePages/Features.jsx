import { useEffect, useState } from 'react';
import useAxiosPublice from '../Hooks/AxiosPublic/useAxiosPublice';
import FeaturesCards from './FeaturesCards';

const Features = () => {
  const axiosPublice = useAxiosPublice();
  const [feature, setFeature] = useState([]);
  useEffect(() => {
    axiosPublice.get('/feature').then(res => {
      setFeature(res.data);
    });
  }, []);

  console.log(feature.length);
  return (
    <div className="my-[110px]">
      <div className="lg:w-2/3 mx-auto text-center">
        <h2 className="text-green-500 font-bold">..... Features .....</h2>
        <p className="mt-3">
          Heres a comprehensive features section for a micro task platform,
          focusing on earning coins, creating and managing tasks, secure
          payments, and more.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-3 gap-6">
        {feature.map(item => (
          <FeaturesCards key={item._id} item={item}></FeaturesCards>
        ))}
      </div>
    </div>
  );
};

export default Features;
