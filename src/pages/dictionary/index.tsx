import { useSelector } from "react-redux";
import { RootState } from "../../store";
import WordTable from "../../components/WordTable";
import { useSearchParams } from "react-router-dom";
import { Word } from "../../types";
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

const Dictionary = () => {
  const words = useSelector((state: RootState) => state.words.ownWords);
  const [searchParams] = useSearchParams();
  const [filteredWords, setFilteredWords] = useState<Word[]>([]);

  const progressQ = searchParams.get("progress");
  const setQ = searchParams.get("set")?.split(",");

  useEffect(() => {
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

    setFilteredWords((prev) =>
      progressQ ? filterByProgress(prev, progressQ) : words
    );
  }, [progressQ]);

  useEffect(() => {
    const filterBySet = (words: Word[], sets: string[]) => {
      return sets.map((set) => words.filter((word) => word.set === set)).flat();
    };

    setFilteredWords((prev) => (setQ ? filterBySet(prev, setQ) : words));
  }, [setQ]);

  // const filteredByProgress = progressQ
  //   ? filterByProgress(words, progressQ)
  //   : words;

  // const filteredBySet = setQ ? filterBySet(words, setQ) : filteredByProgress;

  return <WordTable words={words} title="All words" />;
};

export default Dictionary;
