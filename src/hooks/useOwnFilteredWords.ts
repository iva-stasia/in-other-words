import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const useOwnFilteredWords = (value: string): string[] => {
  const isAddWordDialogOpen = useSelector(
    (state: RootState) => state.dialog.isAddWordDialogOpen
  );
  const [filteredOwnWords, setFilteredOwnWords] = useState<string[]>([]);
  const ownWords = useSelector((state: RootState) => state.words.ownWords);

  useEffect(() => {
    const preparedWords = ownWords.map(({ word }) => word);
    if (value && isAddWordDialogOpen) {
      const filteredOwnWords = preparedWords.filter((ownWord) =>
        ownWord.includes(value.toLowerCase(), 0)
      );
      setFilteredOwnWords(filteredOwnWords);
      return undefined;
    }

    setFilteredOwnWords(preparedWords);
  }, [value, ownWords, isAddWordDialogOpen]);

  return filteredOwnWords;
};

export default useOwnFilteredWords;
