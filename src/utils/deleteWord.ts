import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { db } from '../firebase';
import { Word } from '../types';

export const deleteWord = async (word: Word, uid: string | null) => {
    if (uid) {
      try {
        await updateDoc(doc(db, "userWords", uid), {
          words: arrayRemove(word),
        });
      } catch (error) {
        if (error instanceof Error) console.error(error.message);
      }
    }
  };