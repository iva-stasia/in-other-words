import { useEffect, useState } from 'react';
import {
  WordApiData,
  WordApiResult,
  WordDefinition,
  WordOption,
} from '../types';
import { getWordAudio, wordsApi } from '../utils/api';

const useWordApiData = (
  open: boolean,
  word: WordOption | null
): WordApiData => {
  const [definitions, setDefinitions] = useState<WordDefinition[]>([]);
  const [pronunciation, setPronunciation] = useState<string>('');
  const [audioURL, setAudioURL] = useState<string>('');

  useEffect(() => {
    if (word && word.source !== 'custom') {
      const getWordData = async () => {
        const wordApiData = await wordsApi(
          `${word.word}`
        ).json<WordApiResult>();

        if (wordApiData.results) {
          const result = wordApiData.results.map(
            ({ definition, partOfSpeech, examples, synonyms }) => ({
              definition,
              partOfSpeech,
              examples,
              synonyms,
            })
          );
          setDefinitions(result);
        }

        if (wordApiData.pronunciation) {
          const pronunciation = Object.entries(wordApiData.pronunciation)[0]
            ? Object.entries(wordApiData.pronunciation)[0][1]
            : '';

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
      setPronunciation('');
      setAudioURL('');
    }
  }, [open, word]);

  return { definitions, pronunciation, audioURL };
};

export default useWordApiData;
