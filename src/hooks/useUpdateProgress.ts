import { useSelector } from "react-redux";
import { RootState } from "../store";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Progress } from "../types";

const useUpdateProgress = () => {
  const uid = useSelector((state: RootState) => state.user.uid);

  const updateProgress = async (
    word: string,
    progress: Progress,
    dueDate: Date,
    interval: number,
    factor: number
  ) => {
    if (!uid) return;

    try {
      await updateDoc(doc(db, "userWords", uid), {
        [word + ".learning"]: {
          dueDate: dueDate,
          interval: interval,
          factor: factor,
          progress: progress,
        },
      });
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  };

  return { updateProgress };
};

export default useUpdateProgress;
