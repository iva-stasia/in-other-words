import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const MainLayout = () => {
  const user = useSelector((state: RootState) => state.user);
  console.log('user from MainLayout', user);

  if (!user.email) {
    return <Navigate to={'/login'} />;
  }

  return <Outlet />;
};

export default MainLayout;
