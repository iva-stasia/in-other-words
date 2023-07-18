import { Typography, Link, Divider, Box } from '@mui/material';
import FormRegister from './auth-forms/FormRegister';
import AuthFirebaseGoogle from './auth-forms/AuthFirebaseGoogle';
import { Link as RouterLink } from 'react-router-dom';

const Register = () => {
  return (
    <>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <AuthFirebaseGoogle />
      <Box sx={{ width: '100%' }}>
        <Divider>
          <Typography variant="body2">Or</Typography>
        </Divider>
      </Box>
      <FormRegister />
      <Box>
        <Typography component="span" variant="body2">
          Already have an account?{' '}
        </Typography>
        <Link component={RouterLink} to={'/login'} variant="body2">
          {'Sign in'}
        </Link>
      </Box>
    </>
  );
};

export default Register;
