import { useEffect, useState } from 'react';
import { wordsApi } from '../utils/api';
import { SearchResult } from '../types';
import { LATIN_CHAR_REG_EXP } from '../constants/contacts';
import { useDebouncedCallback } from 'use-debounce';

const useApiWords = (
  inputValue: string
): { apiWords: string[]; loading: boolean } => {
  const [apiWords, setApiWords] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const searchWord = useDebouncedCallback(async (value: string) => {
    console.log(value);

    const words = await wordsApi(
      `?letterPattern=%5E${value.toLowerCase()}%5B%5Cw.-%5D*%24&limit=5&page=1`,
      {
        retry: {
          limit: 5,
          methods: ['get'],
          statusCodes: [429],
          backoffLimit: 500,
        },
      }
    ).json<SearchResult>();

    setApiWords(words.results.data);
    setLoading(false);
  }, 300);

  useEffect(() => {
    if (inputValue.length < 2 || !LATIN_CHAR_REG_EXP.test(inputValue)) {
      return undefined;
    }

    setLoading(true);

    searchWord(inputValue)?.catch(console.error);
  }, [inputValue]);

  return { apiWords, loading };
};

export default useApiWords;
