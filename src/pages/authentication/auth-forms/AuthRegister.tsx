import { VisibilityOff, Visibility } from '@mui/icons-material';
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  IconButton,
  OutlinedInput,
  FormLabel,
  FormHelperText,
} from '@mui/material';
import { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { UserRegisterInput } from '../../../types';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Email must be correct')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be 8 characters long')
    .matches(/[0-9]/, 'Password requires a number')
    .matches(/[a-zA-Z]/, 'Password requires a letter')
    .required('Password is required'),
});

const AuthRegister = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRegisterInput>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const onSubmit: SubmitHandler<UserRegisterInput> = (data) => {
    console.log(data);
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
                placeholder="Min. 8 characters"
                size="small"
                {...field}
              />
              <FormHelperText error sx={{ mx: 0 }}>
                {errors.password?.message}
              </FormHelperText>
            </FormControl>
          )}
        />
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

export default AuthRegister;
