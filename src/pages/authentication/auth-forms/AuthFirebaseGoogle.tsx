import { Box, Button } from "@mui/material";
import GoogleIcon from "../../../assets/images/icons/google.svg";
import { auth, db, provider } from "../../../firebase";
import { signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const AuthFirebaseGoogle = () => {
  const signInWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, provider);
      await setDoc(doc(db, "userWords", res.user.uid), {}, { merge: true });
      await setDoc(doc(db, "userSets", res.user.uid), {}, { merge: true });
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
