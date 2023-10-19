import { useSearchParams } from "react-router-dom";
import { Word } from "../types";
import { useEffect, useState } from "react";

const filterByProgress = (words: Word[], progress: string) => {
  switch (progress) {
    case "all":
      return words;
    case "new":
      return words.filter(({ learning }) => learning.progress === 0);
    case "learning":
      return words.filter(
        ({ learning }) => learning.progress > 0 && learning.progress < 4
      );
    case "learned":
      return words.filter(({ learning }) => learning.progress === 4);
    default:
      return words;
  }
};

const filterBySet = (words: Word[], sets: string[]) => {
  return sets.map((set) => words.filter((word) => word.set === set)).flat();
};

const filterWords = (
  words: Word[],
  progress: string | null,
  sets?: string[] | undefined
) => {
  const filteredByProgress = progress
    ? filterByProgress(words, progress)
    : words;
  const filteredBySet = sets
    ? filterBySet(filteredByProgress, sets)
    : filteredByProgress;

  return filteredBySet;
};

const useFilterWords = (words: Word[]) => {
  const [searchParams] = useSearchParams();
  const [filteredWords, setFilteredWords] = useState<Word[]>([]);

  const progressQ = searchParams.get("progress");
  const setQ = searchParams.get("set")?.split(",");

  useEffect(() => {
    const filtered = filterWords(words, progressQ, setQ);

    setFilteredWords(filtered);
  }, [words, progressQ, setQ]);

  return filteredWords;
};

export default useFilterWords;
