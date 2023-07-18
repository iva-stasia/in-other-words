import { LogoutRounded } from '@mui/icons-material';
import { Button } from '@mui/material';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const Home = () => {
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  }
  
  return (
    <>
      <h1>Home</h1>
      <Button variant="contained" endIcon={<LogoutRounded />} onClick={logout}>
        Logout
      </Button>
    </>
  );
};

export default Home;
