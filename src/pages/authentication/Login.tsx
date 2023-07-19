import { Typography, Link, Divider, Box } from '@mui/material';
import FormLogin from './auth-forms/FormLogin';
import AuthFirebaseGoogle from './auth-forms/AuthFirebaseGoogle';
import { Link as RouterLink } from 'react-router-dom';

const Login = () => {
  return (
    <>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <AuthFirebaseGoogle />
      <Box sx={{ width: '100%' }}>
        <Divider>
          <Typography variant="body2">Or</Typography>
        </Divider>
      </Box>
      <FormLogin />
      <Box>
        <Typography component="span" variant="body2">
          Don't have an account?{' '}
        </Typography>
        <Link component={RouterLink} to={'/register'} variant="body2">
          {'Sign up'}
        </Link>
      </Box>
    </>
  );
};

export default Login;
