import { Typography, Grid, Link, Divider, Box } from '@mui/material';
import AuthWrapper from './AuthWrapper';
import AuthLogin from './auth-forms/AuthLogin';
import AuthFirebase from './auth-forms/AuthFirebase';

const Login = () => {
  return (
    <AuthWrapper>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <AuthFirebase />
      <Box sx={{ width: '100%' }}>
        <Divider>
          <Typography variant="body2">Or</Typography>
        </Divider>
      </Box>
      <AuthLogin />
      <Box>
        <Typography component="span" variant="body2">
          Don't have an account?{' '}
        </Typography>
        <Link href="#" variant="body2">
          {'Sign up'}
        </Link>
      </Box>
    </AuthWrapper>
  );
};

export default Login;
