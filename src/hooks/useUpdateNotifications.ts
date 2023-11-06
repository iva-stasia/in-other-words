import { useSelector } from "react-redux";
import { RootState } from "../store";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const useUpdateNotifications = () => {
  const uid = useSelector((state: RootState) => state.user.uid);

  const updateNotifications = async (id: string, status: boolean) => {
    if (!uid) return;

    try {
      await updateDoc(doc(db, "userNotifications", uid), {
        [id + ".read"]: status,
      });
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  };

  return updateNotifications;
};

export default useUpdateNotifications;
