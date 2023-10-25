import { Container, InnerContainer } from "./Settings.styled";
import { useState } from "react";
import AlertMessage from "../../components/AlertMessage";
import DeleteAccountDialog from "./components/DeleteSetDialog";
import useSettingsFacade from "./settingsFacade";
import ProfileForm from "./components/ProfileForm";

const Settings = () => {
  const { currentUser, alertOpen, setAlertOpen, message, error } =
    useSettingsFacade();
  const [deleteAccountOpen, setDeleteAccountOpen] = useState(false);

  return (
    <Container>
      <InnerContainer>
        <ProfileForm setDeleteAccountOpen={setDeleteAccountOpen} />
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
