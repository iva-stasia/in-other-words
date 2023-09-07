import { useSelector } from "react-redux";
import { RootState } from "../store";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Progress } from "../pages/flashcards/Flashcards";

const useUpdateWord = (word: string, progress: Progress, repeatAt: Date) => {
  const uid = useSelector((state: RootState) => state.user.uid);

  const updateWord = async () => {
    if (!uid) return;

    try {
      await updateDoc(doc(db, "userWords", uid), {
        [word + ".progress"]: progress,
        [word + ".repeatAt"]: repeatAt,
      });
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  };
};

export default useUpdateWord;
