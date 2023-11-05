import { doc, updateDoc } from "firebase/firestore";
import { Word, WordDefinition, WordOption } from "../types";
import { db } from "../firebase";

export const updateWord = async (
  uid: string | null,
  selectedWord: WordOption | Word,
  wordSet: string,
  definitions?: WordDefinition[],
  translation?: string
) => {
  const { word } = selectedWord;
  if (!uid) return;

  try {
    if (definitions) {
      await updateDoc(doc(db, "userWords", uid), {
        [word + ".set"]: wordSet,
        [word + ".translation"]: translation,
        [word + ".definitions"]: definitions.map((definition) => ({
          partOfSpeech: definition.partOfSpeech || "",
          definition: definition.definition,
          synonyms: definition.synonyms || "",
          examples: definition.examples || "",
        })),
      });
    } else {
      await updateDoc(doc(db, "userWords", uid), {
        [word + ".set"]: wordSet,
      });
    }
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
  }
};
