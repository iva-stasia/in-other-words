import { useEffect, useState } from "react";
import { wordsApi } from "../utils/api";
import { SearchResult } from "../types";

const useApiWords = (
  inputValue: string
): { apiWords: string[]; loading: boolean } => {
  const [apiWords, setApiWords] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (inputValue.length < 2) return undefined;
    setLoading(true);

    const searchWord = async () => {
      const words = await wordsApi(
        `?letterPattern=%5E${inputValue.toLowerCase()}%5B%5Cw.-%5D*%24&limit=5&page=1`
      ).json<SearchResult>();

      setApiWords(words.results.data);
      setLoading(false);
    };

    searchWord().catch(console.error);
  }, [inputValue]);

  return { apiWords, loading };
};

export default useApiWords;
