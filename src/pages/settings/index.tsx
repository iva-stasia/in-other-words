import { Container, InnerContainer } from "./Settings.styled";
import { useState } from "react";
import AlertMessage from "../../components/AlertMessage";
import DeleteAccountDialog from "./components/DeleteSetDialog";
import useSettingsFacade from "./settingsFacade";
import ProfileForm from "./components/ProfileForm";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/motion";

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
  } = useSettingsFacade();
  const [deleteAccountOpen, setDeleteAccountOpen] = useState(false);

  return (
    <Container
      component={motion.div}
      variants={fadeIn("down", "tween", 0, 0.3)}
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
