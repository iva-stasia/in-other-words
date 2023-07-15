import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import GoogleIcon from '../../../assets/images/icons/google.svg';

const AuthFirebase = () => {
  return (
    <Box sx={{ width: '100%', my: 3 }}>
      <Button
        variant="outlined"
        color="primary"
        fullWidth
        startIcon={
          <img src={GoogleIcon} alt="Google" width={16} height={16} />
        }>
        Google
      </Button>
    </Box>
  );
};

export default AuthFirebase;
