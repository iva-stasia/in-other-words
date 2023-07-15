import { VisibilityOff, Visibility } from '@mui/icons-material';
import {
  Box,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  OutlinedInput,
  Link,
  Typography,
  Stack,
} from '@mui/material';
import { useState } from 'react';

const AuthRegister = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <>
      <Box
        component="form"
        noValidate
        // onSubmit={handleSubmit}
        marginTop={1}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
        />
        <FormControl fullWidth sx={{ my: 1 }} variant="outlined" required>
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between">
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" size="small" />}
            label={<Typography variant="body2">Remember me</Typography>}
          />
          <Link href="#" variant="body2">
            Forgot password?
          </Link>
        </Stack>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}>
          Sign In
        </Button>
      </Box>
    </>
  );
};

export default AuthRegister;
