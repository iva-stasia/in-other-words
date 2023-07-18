import { Box, Button } from '@mui/material';
import GoogleIcon from '../../../assets/images/icons/google.svg';
import { auth, provider } from '../../../firebase';
import { signInWithPopup } from 'firebase/auth';

const AuthFirebaseGoogle = () => {
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  return (
    <Box sx={{ width: '100%', my: 3 }}>
      <Button
        variant="outlined"
        color="primary"
        fullWidth
        size="large"
        startIcon={<img src={GoogleIcon} alt="Google" width={16} height={16} />}
        onClick={signInWithGoogle}>
        Google
      </Button>
    </Box>
  );
};

export default AuthFirebaseGoogle;
