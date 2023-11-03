import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { LearningLogRecord } from "../types";

const useGetUserLearning = () => {
  const uid = useSelector((state: RootState) => state.user.uid);
  const [learningLog, setLearningLog] = useState<LearningLogRecord[]>([]);

  useEffect(() => {
    if (!uid) return;

    const unsub = onSnapshot(doc(db, "userLearningLog", uid), (doc) => {
      const data = doc.data() as {
        [key: string]: [];
      };

      if (!data) return;

      const preparedData = Object.entries(data).map((record) => ({
        date: record[0],
        words: record[1],
      }));

      setLearningLog(preparedData);
    });

    return () => {
      unsub();
    };
  }, [uid]);

  return learningLog;
};

export default useGetUserLearning;
