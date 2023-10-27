import { useSelector } from "react-redux";
import QuizMode from "../../components/QuizMode";
import { RootState } from "../../../../store";
import { Progress, Word } from "../../../../types";

function getRandomWord(arr: Word[]) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex].word;
}

const DefinitionToWord = () => {
  const words = useSelector((state: RootState) => state.words.ownWords);

  const wordsToDisplay = words.filter(
    ({ learning }) => learning.progress !== Progress.Learned
  );

  const questions = wordsToDisplay.map((word) => {
    const options = [word.word];
    const term = word.definitions.map((def) => def.definition).join(";\r\n");

    while (options.length < 4) {
      const randomWord = getRandomWord(words);

      if (!options.includes(randomWord)) {
        options.push(randomWord);
      }
    }

    return {
      term,
      answer: word.word,
      options,
      origin: word,
    };
  });

  if (questions.length === 0) return;

  return <QuizMode questions={questions.slice(0, 10)} />;
};

export default DefinitionToWord;
