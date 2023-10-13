import { Timestamp, doc, updateDoc } from "firebase/firestore";
import { WordDefinition, WordOption } from "../types";
import { db } from "../firebase";

export const createWord = async (
  uid: string,
  selectedWord: WordOption,
  definition: WordDefinition,
  wordSet: string,
  audioURL?: string,
  pronunciation?: string
) => {
  const { word } = selectedWord;
  try {
    await updateDoc(doc(db, "userWords", uid), {
      [word + ".word"]: word,
      [word + ".audioURL"]: audioURL,
      [word + ".set"]: wordSet,
      [word + ".pronunciation"]: pronunciation || "",
      [word + ".definitions"]: [
        {
          partOfSpeech: definition.partOfSpeech || "",
          definition: definition.definition,
          synonyms: definition.synonyms || "",
          examples: definition.examples || "",
        },
      ],
      [word + ".createdAt"]: Timestamp.now(),
      [word + ".learning"]: {
        dueDate: Timestamp.now(),
        interval: 0,
        factor: 2500,
        progress: 0,
      },
    });
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
  }
};
