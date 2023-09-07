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
      [word + ".progress"]: 0,
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
    });
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
  }
};
