import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  OutlinedInput,
} from '@mui/material';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { UserEmail } from '../../../types';
import { emailSchema } from '../validationSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { auth } from '../../../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { toggleResetEmail } from '../../../store/slices/passwordResetSlice';

const FormPasswordReset = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<UserEmail>({
    defaultValues: {
      email: '',
    },
    mode: 'onBlur',
    resolver: yupResolver(emailSchema),
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(toggleResetEmail(isSubmitted));
  }, [isSubmitted, dispatch]);

  const onSubmit: SubmitHandler<UserEmail> = async ({ email }) => {
    try {
      await sendPasswordResetEmail(auth, email);
      console.log('sent');
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  if (isSubmitted) {
    return <Navigate to={'/password-reset-sent'} />;
  }

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      marginTop={4}
      sx={{ width: '100%' }}>
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
      <Button
        type="submit"
        fullWidth
        variant="contained"
        size="large"
        disabled={isSubmitting}
        sx={{ mt: 3, mb: 2 }}>
        Send
      </Button>
    </Box>
  );
};

export default FormPasswordReset;
