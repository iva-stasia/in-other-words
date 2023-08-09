import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Word, WordOption } from "../types";

const useOwnWord = (word: WordOption | null): string[] => {
  const { uid } = useSelector((state: RootState) => state.user);
  const [ownWords, setOwnWords] = useState<string[]>([]);

  useEffect(() => {
    const getOwnWords = async () => {
      if (uid) {
        const docSnap = await getDoc(doc(db, "userWords", uid));
        const wordsData = docSnap.data();

        if (wordsData) {
          const words =
            wordsData.words !== undefined ? (wordsData.words as Word[]) : [];
          const preparedWords = words.map(({ word }) => word);

          if (word) {
            const filteredOwnWords = preparedWords.filter((ownWord) =>
              ownWord.includes(word.word, 0)
            );
            setOwnWords(filteredOwnWords);
            return undefined;
          }

          setOwnWords(preparedWords);
        }
      }
    };

    getOwnWords().catch(console.error);
  }, [uid, word]);

  return ownWords;
};

export default useOwnWord;
