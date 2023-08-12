import { useEffect, useState } from "react";
import {
  WordApiData,
  WordApiResult,
  WordDefinition,
  WordOption,
} from "../types";
import { getWordAudio, wordsApi } from "../api";

const useWordApiData = (
  open: boolean,
  word: WordOption | null
): WordApiData => {
  const [definitions, setDefinitions] = useState<WordDefinition[]>([]);
  const [pronunciation, setPronunciation] = useState<string>("");
  const [audioURL, setAudioURL] = useState<string>("");

  useEffect(() => {
    if (word && word.source === "apiDictionary") {
      const getWordData = async () => {
        const wordData = await wordsApi(`${word.word}`).json<WordApiResult>();

        if (wordData.results) {
          const definitions = wordData.results.map(
            ({ definition, partOfSpeech, examples, synonyms }) => ({
              definition,
              partOfSpeech,
              examples,
              synonyms,
            })
          );
          setDefinitions(definitions);
        }

        if (wordData.pronunciation) {
          const pronunciation = Object.entries(wordData.pronunciation)[0]
            ? Object.entries(wordData.pronunciation)[0][1]
            : "";

          setPronunciation(pronunciation);
        }
      };

      if (open) {
        getWordData().catch(console.error);
        getWordAudio(word.word)
          .then((res) => setAudioURL(res))
          .catch(console.error);
      }
    } else {
      setDefinitions([]);
      setPronunciation("");
    }
  }, [open, word]);

  return { definitions, pronunciation, audioURL };
};

export default useWordApiData;
