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
import { UserRegisterInput } from '../../../types';
import { registerSchema } from '../validationSchema';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase';

const FormRegister = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserRegisterInput>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
    resolver: yupResolver(registerSchema),
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const onSubmit: SubmitHandler<UserRegisterInput> = async ({
    email,
    password,
  }) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
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
          disabled={isSubmitting}
          sx={{ mt: 3, mb: 2 }}>
          Sign Up
        </Button>
      </Box>
    </>
  );
};

export default FormRegister;
