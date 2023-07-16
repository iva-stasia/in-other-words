import { Navigate, Outlet } from 'react-router-dom';

const Layout = () => {
  // const isAuthenticated = false;

  // if (!isAuthenticated) {
  //   return <Navigate to={'/login'} />;
  // }

  return <Outlet />;
};

export default Layout;
