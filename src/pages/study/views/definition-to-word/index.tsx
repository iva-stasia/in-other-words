import { useSelector } from "react-redux";
import QuizMode from "../../components/QuizMode";
import { RootState } from "../../../../store";
import { Progress, Word } from "../../../../types";

function getRandomWord(arr: Word[]) {
  const randomIndex = Math.floor(Math.random() * (arr.length - 1));
  return arr[randomIndex].word;
}

const DefinitionToWord = () => {
  const words = useSelector((state: RootState) => state.words.ownWords);

  const wordsToDisplay = words.filter(
    ({ learning }) => learning.progress !== Progress.Learned
  );

  let attempts = 0;

  const questions = wordsToDisplay.map((word) => {
    const options = [word.word];
    const termDefs = word.definitions.map((def) => def.definition);
    const term = word.translation
      ? [word.translation, ...termDefs].join(";\r\n")
      : termDefs.join(";\r\n");

    while (options.length < 4) {
      const randomWord = getRandomWord(words);

      if (!options.includes(randomWord)) {
        options.push(randomWord);
      }

      if (attempts > 5000) {
        throw new Error("Something went wrong, please try later.");
      }

      attempts++;
    }

    return {
      term,
      answer: word.word,
      options,
      origin: word,
    };
  });

  return <QuizMode questions={questions.slice(0, 10)} />;
};

export default DefinitionToWord;
