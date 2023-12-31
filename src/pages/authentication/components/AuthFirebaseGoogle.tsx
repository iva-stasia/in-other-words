import { Box, Button, Typography } from "@mui/material";
import GoogleIcon from "/google.svg";
import { auth, db, provider } from "../../../firebase";
import { signInWithPopup } from "firebase/auth";
import { Timestamp, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { UserData } from "../../../types";
import BtnLoader from "../../../components/BtnLoader";
import { useState } from "react";

const AuthFirebaseGoogle = () => {
  const [submitting, setSubmitting] = useState(false);

  const signInWithGoogle = async () => {
    setSubmitting(true);

    try {
      const { user } = await signInWithPopup(auth, provider);

      if (!user.email) return;

      const data = (
        await getDoc(doc(db, "users", user.uid))
      ).data() as UserData;

      if (data) return;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        activityLog: [Timestamp.now()],
        lastLoginDate: Timestamp.now(),
      });

      await setDoc(doc(db, "userWords", user.uid), {}, { merge: true });
      await setDoc(doc(db, "userSets", user.uid), {}, { merge: true });
      await setDoc(doc(db, "userLearningLog", user.uid), {}, { merge: true });
      await setDoc(doc(db, "userNotifications", user.uid), {});

      const id = crypto.randomUUID().replace("-", "");

      await updateDoc(doc(db, "userNotifications", user.uid), {
        [id + ".id"]: id,
        [id + ".date"]: Timestamp.now(),
        [id + ".text"]: "Nice to see you!",
        [id + ".read"]: false,
        [id + ".icon"]: "1f680",
        [id + ".path"]: "welcome",
      });
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }

    setSubmitting(false);
  };

  return (
    <Box sx={{ width: "100%", my: 3 }}>
      <Button
        variant="outlined"
        color="primary"
        fullWidth
        size="large"
        startIcon={
          submitting ? (
            ""
          ) : (
            <img src={GoogleIcon} alt="Google" width={16} height={16} />
          )
        }
        onClick={signInWithGoogle}
        disabled={submitting}
      >
        <Typography variant="button" sx={{ opacity: submitting ? 0 : 1 }}>
          with Google
        </Typography>
        {submitting && <BtnLoader color="primary" />}
      </Button>
    </Box>
  );
};

export default AuthFirebaseGoogle;
