import { Outlet } from 'react-router-dom';
import Naver from '../Compment/Naver/Naver';
import Footer from '../Compment/Footer/Footer';

const MainLayout = () => {
  return (
    <div>
      <Naver></Naver>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
