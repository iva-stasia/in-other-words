import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { WordSet } from "../types";

const useWordSets = () => {
  const { uid } = useSelector((state: RootState) => state.user);
  const [wordSets, setWordSets] = useState<WordSet[]>([]);

  useEffect(() => {
    if (uid) {
      const unsub = onSnapshot(doc(db, "userSets", uid), (doc) => {
        const setsData = doc.data();

        if (setsData) {
          setsData.sets !== undefined
            ? setWordSets(setsData.sets as WordSet[])
            : setWordSets([]);
        }
      });

      return () => {
        unsub();
      };
    }
  }, [uid]);

  return wordSets;
};

export default useWordSets;
