import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, Outlet } from 'react-router-dom';
import { auth } from './firebase';
import { useSelector } from 'react-redux';
import { RootState } from './store';

const Layout = () => {
  const user = useSelector((state: RootState) => state.user);
  console.log('user from layout', user);

  if (!user) {
    return <Navigate to={'/login'} />;
  }

  return <Outlet />;
};

export default Layout;
