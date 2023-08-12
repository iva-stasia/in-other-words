import { useEffect, useState } from "react";
import { Word, WordOption } from "../types";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const useOwnWordData = (word: WordOption | null): Word[] => {
  const { uid } = useSelector((state: RootState) => state.user);
  const [wordData, setWordData] = useState<Word[]>([]);

  useEffect(() => {
    const getOwnWords = async () => {
      if (uid) {
        const docSnap = await getDoc(doc(db, "userWords", uid));
        const wordsData = docSnap.data();

        if (wordsData) {
          const words =
            wordsData.words !== undefined ? (wordsData.words as Word[]) : [];

          if (word) {
            const selectedWordData = words.filter(
              (ownWord) => ownWord.word === word.word
            );
            setWordData(selectedWordData);
            return undefined;
          }
        }
      }
    };

    getOwnWords().catch(console.error);
  }, [uid, word]);

  return wordData;
};

export default useOwnWordData;
