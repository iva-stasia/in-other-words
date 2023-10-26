import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { DeleteAccountContainer, GridBtnContainer } from "./ProfileForm.styled";
import { useNavigate } from "react-router-dom";
import useSettingsFacade from "../../settingsFacade";

interface ProfileFormProps {
  setDeleteAccountOpen: (deleteAccountOpen: boolean) => void;
}

const ProfileForm = ({ setDeleteAccountOpen }: ProfileFormProps) => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    onSubmit,
    displayName,
    currentPhotoURL,
    setCurrentPhotoURL,
    isSubmitting,
    errors,
    handleDeletePhoto,
  } = useSettingsFacade();

  return (
    <Grid
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      container
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      rowGap={{ xs: 1, sm: 2, md: 3 }}
      alignItems="center"
      sx={{ marginLeft: { xs: -1, sm: -2, md: -3 } }}
    >
      <Grid item xs={12} sm={4} md={3}>
        <Typography variant="h6">Profile Picture</Typography>
      </Grid>
      <Grid item xs={12} sm={8} md={9}>
        <Stack direction="row" alignItems="center" gap={4}>
          <Avatar
            alt={displayName || ""}
            src={currentPhotoURL || ""}
            sx={{ width: 80, height: 80 }}
          />

          <Stack direction="column">
            <Stack direction="row" gap={1} flexWrap="wrap">
              <Controller
                name="photoURL"
                control={control}
                render={({ field: { onChange, ...field } }) => (
                  <Button
                    {...field}
                    onChange={(event) => {
                      const file = (event.target as HTMLInputElement)
                        .files?.[0];
                      onChange(file);

                      if (file && file instanceof File) {
                        setCurrentPhotoURL(URL.createObjectURL(file));
                      }
                    }}
                    variant="text"
                    component="label"
                    disabled={isSubmitting}
                  >
                    Update
                    <input type="file" hidden />
                  </Button>
                )}
              />

              <Button
                variant="text"
                disabled={isSubmitting}
                onClick={handleDeletePhoto}
              >
                Delete
              </Button>
            </Stack>

            <FormHelperText error sx={{ mx: 0 }}>
              {errors.photoURL?.message}
            </FormHelperText>
          </Stack>
        </Stack>
      </Grid>

      <Grid item xs={12} sm={4} md={3}>
        <Typography variant="h6">User Name</Typography>
      </Grid>
      <Grid item xs={12} sm={8} md={9}>
        <Controller
          name="displayName"
          control={control}
          render={({ field }) => (
            <OutlinedInput
              id="displayName"
              type="text"
              size="small"
              fullWidth
              {...field}
            />
          )}
        />
      </Grid>

      <Grid item xs={12} sm={4} md={3}>
        <Typography variant="h6">Email</Typography>
      </Grid>
      <Grid item xs={12} sm={8} md={9}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <FormControl required fullWidth>
              <OutlinedInput
                id="email"
                type="email"
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
      </Grid>

      <Grid item xs={12}>
        <DeleteAccountContainer>
          <Box>
            <Typography variant="h6">Delete Account</Typography>
            <Typography sx={{ color: "text.secondary" }}>
              Be careful - this will delete all your data and cannot be undone.
            </Typography>
          </Box>
          <Box sx={{ whiteSpace: "nowrap" }}>
            <Button
              variant="outlined"
              color="error"
              disabled={isSubmitting}
              onClick={() => setDeleteAccountOpen(true)}
            >
              Delete Account
            </Button>
          </Box>
        </DeleteAccountContainer>
      </Grid>

      <GridBtnContainer item xs={12}>
        <Button
          variant="outlined"
          disabled={isSubmitting}
          onClick={() => navigate(-1)}
        >
          Cancel
        </Button>
        <Button variant="contained" disabled={isSubmitting} type="submit">
          Save Changes
        </Button>
      </GridBtnContainer>
    </Grid>
  );
};

export default ProfileForm;