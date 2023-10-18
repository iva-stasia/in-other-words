import { useEffect, useState } from "react";
import { WordOption } from "../types";

const useWordOptions = (
  apiWords: string[],
  ownWords: string[],
  inputValue: string
): WordOption[] => {
  const [options, setOptions] = useState<WordOption[]>([]);

  useEffect(() => {
    const notAddedApiWords = apiWords.filter(
      (word) => !ownWords.includes(word)
    );
    const preparedNotAddedApiWords = notAddedApiWords.map<WordOption>(
      (word) => ({ word, source: "apiDictionary" })
    );
    const preparedOwnWords = ownWords.map<WordOption>((word) => ({
      word,
      source: "ownDictionary",
    }));

    if (inputValue.length < 2) {
      setOptions([]);
      return undefined;
    }

    setOptions([...preparedNotAddedApiWords, ...preparedOwnWords]);
  }, [ownWords, apiWords, inputValue]);

  return options;
};

export default useWordOptions;
