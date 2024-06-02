import { Outlet } from 'react-router-dom';
import Footer from '../../../../Compment/Footer/Footer';
import SiteVers from '../SiteVer/SiteVers';
import DasbordUser from '../SiteVer/DasbordUser';

const Dashboard = () => {
  return (
    <div>
      <div className="">
        <SiteVers></SiteVers>
        <DasbordUser></DasbordUser>
      </div>
      <div className="lg:ml-64">
        <Outlet></Outlet>
      </div>
      <div className=" lg:ml-64">
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Dashboard;
