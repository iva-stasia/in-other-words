import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Word } from "../types";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const useOwnWords = (): Word[] => {
  const { uid } = useSelector((state: RootState) => state.user);
  const [words, setWords] = useState<Word[]>([]);

  useEffect(() => {
    if (uid) {
      const unsub = onSnapshot(doc(db, "userWords", uid), (doc) => {
        const wordsData = doc.data();

        if (wordsData) {
          const ownWords = Object.values(wordsData) as Word[];
          const sortedByDateWords = ownWords.sort(
            (a, b) => Number(b.creationDate) - Number(a.creationDate)
          );

          setWords(sortedByDateWords);
        }
      });

      return () => {
        unsub();
      };
    }
  }, [uid]);

  return words;
};

export default useOwnWords;
