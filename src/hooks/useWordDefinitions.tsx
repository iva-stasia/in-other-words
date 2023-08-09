import { useEffect, useState } from "react";
import { WordDefinition, WordDefinitions, WordOption } from "../types";
import { wordsApi } from "../api";

const useWordDefinitions = (
  open: boolean,
  word: WordOption | null
): WordDefinition[] => {
  const [definitions, setDefinitions] = useState<WordDefinition[]>([]);

  useEffect(() => {
    if (word && word.source === "apiDictionary") {
      const getWordDefs = async () => {
        const wordData = await wordsApi(
          `${word.word}/definitions`
        ).json<WordDefinitions>();

        setDefinitions(wordData.definitions);
      };

      if (open) {
        getWordDefs().catch(console.error);
      }
    } else {
      setDefinitions([]);
    }
  }, [open, word]);

  return definitions;
};

export default useWordDefinitions;
