import { VisibilityOff, Visibility } from '@mui/icons-material';
import {
  Box,
  Button,
  FormControlLabel,
  Checkbox,
  FormControl,
  InputAdornment,
  IconButton,
  OutlinedInput,
  Link,
  Typography,
  Stack,
  FormLabel,
  FormHelperText,
} from '@mui/material';
import { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { UserLoginInput } from '../../../types';
import { loginSchema } from '../validationSchema';
import {
  setPersistence,
  signInWithEmailAndPassword,
  browserLocalPersistence,
} from 'firebase/auth';
import { auth } from '../../../firebase';

const AuthLogin = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLoginInput>({
    defaultValues: {
      email: '',
      password: '',
      remember: true,
    },
    mode: 'onBlur',
    resolver: yupResolver(loginSchema),
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const onSubmit: SubmitHandler<UserLoginInput> = async ({
    email,
    password,
  }) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  return (
    <>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        marginTop={1}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth sx={{ my: 1 }} variant="outlined" required>
              <FormLabel htmlFor="email" sx={{ mb: 1, color: 'text.primary' }}>
                Email Address
              </FormLabel>
              <OutlinedInput
                id="email"
                type="email"
                placeholder="Your email"
                size="small"
                autoComplete="email"
                {...field}
              />
              <FormHelperText error sx={{ mx: 0 }}>
                {errors.email?.message}
              </FormHelperText>
            </FormControl>
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth sx={{ my: 1 }} variant="outlined" required>
              <FormLabel
                htmlFor="password"
                sx={{ mb: 1, color: 'text.primary' }}>
                Password
              </FormLabel>
              <OutlinedInput
                id="password"
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
                placeholder="Your password"
                size="small"
                {...field}
              />
              <FormHelperText error sx={{ mx: 0 }}>
                {errors.password?.message}
              </FormHelperText>
            </FormControl>
          )}
        />
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between">
          <Controller
            name="remember"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    size="small"
                    checked={field.value}
                    {...field}
                  />
                }
                label={<Typography variant="body2">Remember me</Typography>}
              />
            )}
          />
          <Link href="#" variant="body2">
            Forgot password?
          </Link>
        </Stack>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          sx={{ mt: 3, mb: 2 }}>
          Sign In
        </Button>
      </Box>
    </>
  );
};

export default AuthLogin;