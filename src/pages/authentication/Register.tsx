import { Typography, Link, Divider, Box } from '@mui/material';
import AuthWrapper from './AuthWrapper';
import AuthRegister from './auth-forms/AuthRegister';
import AuthFirebase from './auth-forms/AuthFirebaseGoogle';
import { Link as RouterLink } from 'react-router-dom';

const Register = () => {
  return (
    <AuthWrapper>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <AuthFirebase />
      <Box sx={{ width: '100%' }}>
        <Divider>
          <Typography variant="body2">Or</Typography>
        </Divider>
      </Box>
      <AuthRegister />
      <Box>
        <Typography component="span" variant="body2">
          Already have an account?{' '}
        </Typography>
        <Link component={RouterLink} to={'/login'} variant="body2">
          {'Sign in'}
        </Link>
      </Box>
    </AuthWrapper>
  );
};

export default Register;