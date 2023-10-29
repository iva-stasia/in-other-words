import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Timestamp, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { UserData } from "../types";

const useGetUserActivity = () => {
  const uid = useSelector((state: RootState) => state.user.uid);
  const [activityLog, setActivityLog] = useState<Timestamp[]>([]);

  useEffect(() => {
    if (!uid) return;

    const getUserActivity = async () => {
      try {
        const data = (await getDoc(doc(db, "users", uid))).data() as UserData;

        if (!data.activityLog) return;

        setActivityLog(data.activityLog);
      } catch (error) {
        console.log("Something went wrong.", error);
      }
    };

    getUserActivity().catch(console.error);
  }, [uid]);

  return activityLog;
};

export default useGetUserActivity;
