import { Link, Typography } from '@mui/material';
import FormPasswordReset from './auth-forms/FormPasswordReset';
import { Link as RouterLink } from 'react-router-dom';

const PasswordReset = () => {
  return (
    <>
      <Typography component="h1" variant="h5">
        Forgot your password?
      </Typography>
      <Typography component="p" variant="body1" align="center" mt={2}>
        Enter your email address below and we'll send you a link to reset your
        password.
      </Typography>
      <FormPasswordReset />
      <Link component={RouterLink} to={'/login'} variant="body2">
        {'Back to Sign in'}
      </Link>
    </>
  );
};

export default PasswordReset;
