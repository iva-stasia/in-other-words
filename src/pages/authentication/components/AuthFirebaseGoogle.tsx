import { Box, Button } from "@mui/material";
import GoogleIcon from "/google.svg";
import { auth, db, provider } from "../../../firebase";
import { signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const AuthFirebaseGoogle = () => {
  const signInWithGoogle = async () => {
    try {
      const { user } = await signInWithPopup(auth, provider);

      try {
        await setDoc(
          doc(db, "users", user.uid),
          {
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          },
          { merge: true }
        );
      } catch (error) {
        if (error instanceof Error) console.error(error.message);
      }

      await setDoc(doc(db, "userWords", user.uid), {}, { merge: true });
      await setDoc(doc(db, "userSets", user.uid), {}, { merge: true });
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  };

  return (
    <Box sx={{ width: "100%", my: 3 }}>
      <Button
        variant="outlined"
        color="primary"
        fullWidth
        size="large"
        startIcon={<img src={GoogleIcon} alt="Google" width={16} height={16} />}
        onClick={signInWithGoogle}
      >
        with Google
      </Button>
    </Box>
  );
};

export default AuthFirebaseGoogle;
