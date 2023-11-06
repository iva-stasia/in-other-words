import { useSelector } from "react-redux";
import QuizMode from "../../components/QuizMode";
import { RootState } from "../../../../store";
import { Progress, Word } from "../../../../types";

function getRandomIndex(arr: Word[]) {
  return Math.floor(Math.random() * arr.length);
}

const WordToDefinition = () => {
  const words = useSelector((state: RootState) => state.words.ownWords);

  const wordsToDisplay = words.filter(
    ({ learning }) => learning.progress !== Progress.Learned
  );

  const questions = wordsToDisplay.map((word) => {
    const answerDefs = word.definitions.map((def) => def.definition);

    const answer = word.translation
      ? [word.translation, ...answerDefs].join(";\r\n")
      : answerDefs.join(";\r\n");

    const options = [answer];

    let attempts = 0;

    while (options.length < 4) {
      const randomWord = wordsToDisplay[getRandomIndex(words)];

      const randomWordDefs = randomWord.definitions.map(
        (def) => def.definition
      );

      const randomOption = randomWord.translation
        ? [randomWord.translation, ...randomWordDefs].join(";\r\n")
        : randomWordDefs.join(";\r\n");

      if (!options.includes(randomOption)) {
        options.push(randomOption);
      }

      if (attempts > 5000) {
        throw new Error("Something went wrong, please try later.");
      }

      attempts++;
    }

    return {
      term: word.word,
      audio: word.audioURL,
      answer,
      options,
      origin: word,
    };
  });

  return <QuizMode questions={questions.slice(0, 10)} />;
};

export default WordToDefinition;
