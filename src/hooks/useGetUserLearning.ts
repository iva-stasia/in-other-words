import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { LearningLogRecord } from "../types";

const useGetUserLearning = () => {
  const uid = useSelector((state: RootState) => state.user.uid);
  const [learningLog, setLearningLog] = useState<LearningLogRecord[]>([]);

  useEffect(() => {
    if (!uid) return;

    const getUserLearning = async () => {
      try {
        const data = (await getDoc(doc(db, "userLearningLog", uid))).data() as {
          [key: string]: [];
        };

        if (!data) return;

        const preparedData = Object.entries(data).map((record) => ({
          date: record[0],
          words: record[1],
        }));

        setLearningLog(preparedData);
      } catch (error) {
        console.log("Something went wrong.", error);
      }
    };

    getUserLearning().catch(console.error);
  }, [uid]);

  return learningLog;
};

export default useGetUserLearning;
