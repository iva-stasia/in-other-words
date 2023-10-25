import { useSelector } from "react-redux";
import {
  Container,
  DeleteAccountContainer,
  GridBtnContainer,
  InnerContainer,
} from "./Settings.styled";
import { RootState } from "../../store";
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
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { profileSchema } from "../../utils/formValidationSchemes";
import { updateProfile } from "firebase/auth";
import { useState } from "react";
import { auth, db, storage } from "../../firebase";
import { UserProfile } from "../../types";
import { doc, updateDoc } from "firebase/firestore";
import AlertMessage from "../../components/AlertMessage";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Settings = () => {
  const [message, setMessage] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [error, setError] = useState(false);
  const { displayName, photoURL, email } = useSelector(
    (state: RootState) => state.user
  );

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
    getFieldState,
  } = useForm<UserProfile>({
    defaultValues: {
      photoURL: photoURL || "",
      displayName: displayName || "",
      email: email || "",
    },
    values: {
      photoURL: "",
      displayName: displayName || "",
      email: email || "",
    },
    resetOptions: {
      keepDirtyValues: true,
    },
    mode: "onBlur",
    resolver: yupResolver(profileSchema),
  });

  const onSubmit: SubmitHandler<UserProfile> = async (form) => {
    const currentUser = auth.currentUser;

    console.log("submitted");

    if (!currentUser || !isDirty) return;

    if (getFieldState("photoURL").isDirty && form.photoURL instanceof File) {
      const storageRef = ref(storage, crypto.randomUUID());

      await uploadBytesResumable(storageRef, form.photoURL).then(() => {
        getDownloadURL(storageRef)
          .then(async (downloadURL) => {
            const newPhotoURL =
              typeof downloadURL === "string" ? downloadURL : "";

            try {
              await updateProfile(currentUser, {
                displayName: form.displayName,
                photoURL: newPhotoURL,
              });

              await updateDoc(doc(db, "users", currentUser.uid), {
                displayName: form.displayName,
                photoURL: newPhotoURL,
              });

              const message = "Profile has been successfully updated!";
              setMessage(message);

              console.log("updated");
            } catch (error) {
              const message =
                "Ops! Something went wrong. Please try again later.";
              setMessage(message);
              setError(true);
              console.error(error);

              console.log("not updated");
            }
          })
          .catch(console.error);
      });
    } else {
      try {
        await updateProfile(currentUser, {
          displayName: form.displayName,
        });

        await updateDoc(doc(db, "users", currentUser.uid), {
          displayName: form.displayName,
        });

        const message = "Profile has been successfully updated!";
        setMessage(message);

        console.log("updated");
      } catch (error) {
        const message = "Ops! Something went wrong. Please try again later.";
        setMessage(message);
        setError(true);
        console.error(error);

        console.log("not updated");
      }
    }
  };

  return (
    <Container>
      <InnerContainer>
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
                src={photoURL || ""}
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
                          onChange(
                            (event.target as HTMLInputElement).files?.[0]
                          );
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

                  <Button variant="text" disabled={isSubmitting}>
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
                  Be careful - this will delete all your data and cannot be
                  undone.
                </Typography>
              </Box>
              <Box sx={{ whiteSpace: "nowrap" }}>
                <Button
                  variant="outlined"
                  color="error"
                  disabled={isSubmitting}
                >
                  Delete Account
                </Button>
              </Box>
            </DeleteAccountContainer>
          </Grid>

          <GridBtnContainer item xs={12}>
            <Button variant="outlined" disabled={isSubmitting}>
              Cancel
            </Button>
            <Button variant="contained" disabled={isSubmitting} type="submit">
              Save Changes
            </Button>
          </GridBtnContainer>
        </Grid>
      </InnerContainer>

      <AlertMessage
        alertOpen={alertOpen}
        setAlertOpen={setAlertOpen}
        message={message}
        severity={error ? "error" : "success"}
      />
    </Container>
  );
};

export default Settings;
