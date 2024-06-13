import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';

const PrivtedRouted = ({ children }) => {
  const { user, loding } = useAuth();
  const location = useLocation();
  if (loding) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }
  if (!user) {
    return <Navigate to={'/login'} state={location?.pathname}></Navigate>;
  }
  return <div>{children}</div>;
};

export default PrivtedRouted;
