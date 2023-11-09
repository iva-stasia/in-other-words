import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useDispatch } from "react-redux";
import { SubmitHandler, useForm } from "react-hook-form";
import { UserData, UserProfile } from "../../types";
import { auth, db, storage } from "../../firebase";
import { yupResolver } from "@hookform/resolvers/yup";
import { profileSchema } from "../../utils/formValidationSchemes";
import { setActivePage } from "../../store/slices/menuSlice";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { User, updateEmail, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { saveUser } from "../../store/slices/userSlice";

const useSettingsFacade = () => {
  const [message, setMessage] = useState("hello");
  const [alertOpen, setAlertOpen] = useState(false);
  const [error, setError] = useState(false);
  const [currentPhotoURL, setCurrentPhotoURL] = useState<string | null>(null);
  const [reauth, setReauth] = useState(false);
  const [newUserData, setNewUserData] = useState<UserData | null>(null);
  const { displayName, photoURL, email } = useSelector(
    (state: RootState) => state.user
  );
  const dispatch = useDispatch();
  const currentUser = auth.currentUser;

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    getFieldState,
    setValue,
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

  useEffect(() => {
    dispatch(setActivePage("Settings"));
  }, []);

  useEffect(() => {
    if (getFieldState("photoURL").isDirty) return;

    setCurrentPhotoURL(photoURL);
  }, [photoURL]);

  const onSubmit: SubmitHandler<UserProfile> = async (form) => {
    setError(false);

    if (!currentUser) return;

    if (getFieldState("photoURL").isDirty && form.photoURL instanceof File) {
      const storageRef = ref(storage, crypto.randomUUID());

      await uploadBytesResumable(storageRef, form.photoURL).then(() => {
        getDownloadURL(storageRef)
          .then(async (downloadURL) => {
            const newPhotoURL =
              typeof downloadURL === "string" ? downloadURL : "";

            try {
              await handleProfileUpdating(
                form.displayName,
                newPhotoURL,
                form.email
              );
            } catch (error) {
              if (
                error instanceof Error &&
                error.message ===
                  "Firebase: Error (auth/requires-recent-login)."
              ) {
                setNewUserData({
                  displayName: form.displayName || "",
                  email: form.email,
                  photoURL: currentPhotoURL,
                  uid: currentUser.uid,
                });

                setReauth(true);
              } else if (error instanceof Error) handleError(error);
            }
          })
          .catch(console.error);
      });
    } else {
      try {
        await handleProfileUpdating(
          form.displayName,
          currentPhotoURL,
          form.email
        );
      } catch (error) {
        if (
          error instanceof Error &&
          error.message === "Firebase: Error (auth/requires-recent-login)."
        ) {
          setNewUserData({
            displayName: form.displayName || "",
            email: form.email,
            photoURL: currentPhotoURL,
            uid: currentUser.uid,
          });

          setReauth(true);
        } else if (error instanceof Error) handleError(error);
      }
    }
  };

  const handleProfileUpdating = async (
    name: string | undefined | null,
    photoUrl: string | null,
    email: string
  ) => {
    if (!currentUser) return;

    await updateProfile(currentUser, {
      displayName: name || "",
      photoURL: photoUrl || "",
    });

    getFieldState("email").isDirty &&
      (await updateUserEmail(currentUser, email));

    await updateDoc(doc(db, "users", currentUser.uid), {
      displayName: name,
      photoURL: photoUrl,
      email: email,
    });

    const message = "Profile has been successfully updated!";
    setMessage(message);
    setAlertOpen(true);
    dispatch(saveUser(currentUser));
  };

  const handleError = (error: Error) => {
    const message = "Ops! Something went wrong. Please try again later.";
    setMessage(message);
    setError(true);
    setAlertOpen(true);
    console.error(error);
  };

  const updateUserEmail = async (user: User, email: string) => {
    await updateEmail(user, email);
  };

  const handleDeletePhoto = () => {
    setValue("photoURL", "", { shouldDirty: true });
    setCurrentPhotoURL("");
  };

  const isDefaultUser = currentUser?.email === "user@gmail.com";

  return {
    handleSubmit,
    control,
    onSubmit,
    displayName,
    currentPhotoURL,
    setCurrentPhotoURL,
    isSubmitting,
    errors,
    currentUser,
    alertOpen,
    setAlertOpen,
    message,
    error,
    handleDeletePhoto,
    isDefaultUser,
    reauth,
    setReauth,
    newUserData,
    handleProfileUpdating,
  };
};

export default useSettingsFacade;
