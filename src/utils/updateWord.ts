import { doc, updateDoc } from "firebase/firestore";
import { WordDefinition, WordOption } from "../types";
import { db } from "../firebase";

export const updateWord = async (
  uid: string,
  selectedWord: WordOption,
  definitions: WordDefinition[],
  wordSet: string
) => {
  const { word } = selectedWord;
  try {
    await updateDoc(doc(db, "userWords", uid), {
      [word + ".set"]: wordSet,
      [word + ".definitions"]: definitions.map((definition) => ({
        partOfSpeech: definition.partOfSpeech || "",
        definition: definition.definition,
        synonyms: definition.synonyms || "",
        examples: definition.examples || "",
      })),
    });
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
  }
};
