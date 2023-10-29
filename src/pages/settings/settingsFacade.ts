import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useDispatch } from "react-redux";
import { SubmitHandler, useForm } from "react-hook-form";
import { UserProfile } from "../../types";
import { auth, db, storage } from "../../firebase";
import { yupResolver } from "@hookform/resolvers/yup";
import { profileSchema } from "../../utils/formValidationSchemes";
import { setActivePage } from "../../store/slices/menuSlice";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { User, updateEmail, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";

const useSettingsFacade = () => {
  const [message, setMessage] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [error, setError] = useState(false);
  const [currentPhotoURL, setCurrentPhotoURL] = useState<string | null>(null);
  const { displayName, photoURL, email } = useSelector(
    (state: RootState) => state.user
  );
  const currentUser = auth.currentUser;
  const dispatch = useDispatch();

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
    console.log(getFieldState("photoURL").isDirty || currentPhotoURL === "");

    if (!currentUser) return;

    if (getFieldState("photoURL").isDirty && form.photoURL instanceof File) {
      console.log("hey");
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

              getFieldState("email").isDirty &&
                (await updateUserEmail(currentUser, form.email));

              await updateDoc(doc(db, "users", currentUser.uid), {
                displayName: form.displayName,
                photoURL: newPhotoURL,
                email: form.email,
              });

              const message = "Profile has been successfully updated!";
              setMessage(message);
              setAlertOpen(true);
            } catch (error) {
              const message =
                "Ops! Something went wrong. Please try again later.";
              setMessage(message);
              setError(true);
              setAlertOpen(true);
              console.error(error);
            }
          })
          .catch(console.error);
      });
    } else {
      try {
        await updateProfile(currentUser, {
          displayName: form.displayName,
          photoURL: currentPhotoURL,
        });

        getFieldState("email").isDirty &&
          (await updateUserEmail(currentUser, form.email));

        await updateDoc(doc(db, "users", currentUser.uid), {
          displayName: form.displayName,
          photoURL: currentPhotoURL,
          email: form.email,
        });

        const message = "Profile has been successfully updated!";
        setMessage(message);
        setAlertOpen(true);
      } catch (error) {
        const message = "Ops! Something went wrong. Please try again later.";
        setMessage(message);
        setError(true);
        setAlertOpen(true);
        console.error(error);
      }
    }
  };

  const updateUserEmail = async (user: User, email: string) => {
    try {
      await updateEmail(user, email);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeletePhoto = () => {
    setValue("photoURL", "", { shouldDirty: true });
    setCurrentPhotoURL("");
  };

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
  };
};

export default useSettingsFacade;
