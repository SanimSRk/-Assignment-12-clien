import Features from '../../../HomePages/Features';
import Testimonial from '../../../HomePages/Testimonial/Testimonial';
import TopSixUsers from '../../../HomePages/TopSixUser/TopSixUsers';
import Works from '../../../HomePages/Works/Works';
import Banner from '../Banner/Banner';

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Features></Features>
      <Works></Works>
      <TopSixUsers></TopSixUsers>
      <Testimonial></Testimonial>
    </div>
  );
};

export default Home;
