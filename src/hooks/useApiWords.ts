import { useEffect, useState } from "react";
import { wordsApi } from "../api";
import { SearchResult } from "../types";

const useApiWords = (inputValue: string): string[] => {
  const [apiWords, setApiWords] = useState<string[]>([]);

  useEffect(() => {
    if (inputValue.length < 2) return undefined;

    const searchWord = async () => {
      const words = await wordsApi(
        `?letterPattern=%5E${inputValue.toLowerCase()}%5B%5Cw.-%5D*%24&limit=5&page=1`
      ).json<SearchResult>();

      setApiWords(words.results.data);
    };

    searchWord().catch(console.error);
  }, [inputValue]);

  return apiWords;
};

export default useApiWords;
