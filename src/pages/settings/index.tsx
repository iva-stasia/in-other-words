import { Container, InnerContainer } from "./Settings.styled";
import { useState } from "react";
import AlertMessage from "../../components/AlertMessage";
import DeleteAccountDialog from "./components/DeleteAccountDialog";
import useSettingsFacade from "./settingsFacade";
import ProfileForm from "./components/ProfileForm";
import { motion } from "framer-motion";
import { fade, fadeIn } from "../../utils/motion";
import { useMediaQuery, useTheme } from "@mui/material";

const Settings = () => {
  const {
    currentUser,
    alertOpen,
    setAlertOpen,
    message,
    error,
    handleSubmit,
    control,
    onSubmit,
    displayName,
    currentPhotoURL,
    setCurrentPhotoURL,
    isSubmitting,
    errors,
    handleDeletePhoto,
    isDefaultUser,
  } = useSettingsFacade();
  const [deleteAccountOpen, setDeleteAccountOpen] = useState(false);
  const theme = useTheme();
  const matchDownSm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container
      component={motion.div}
      variants={matchDownSm ? fade : fadeIn("up", "tween", 0, 0.3)}
      initial="hidden"
      animate="show"
      key={location.pathname}
    >
      <InnerContainer>
        <ProfileForm
          setDeleteAccountOpen={setDeleteAccountOpen}
          displayName={displayName || ""}
          isSubmitting={isSubmitting}
          setCurrentPhotoURL={setCurrentPhotoURL}
          handleDeletePhoto={handleDeletePhoto}
          handleSubmit={handleSubmit}
          control={control}
          onSubmit={onSubmit}
          currentPhotoURL={currentPhotoURL || ""}
          errors={errors}
          isDefaultUser={isDefaultUser}
        />
      </InnerContainer>

      {currentUser && (
        <DeleteAccountDialog
          deleteAccountOpen={deleteAccountOpen}
          setDeleteAccountOpen={setDeleteAccountOpen}
          currentUser={currentUser}
        />
      )}

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
