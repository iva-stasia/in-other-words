import { useSelector } from "react-redux";
import QuizMode from "../../components/QuizMode";
import { RootState } from "../../../../store";
import { Progress, Word } from "../../../../types";

function getRandomDef(arr: Word[]) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex].definitions;
}

const WordToDefinition = () => {
  const words = useSelector((state: RootState) => state.words.ownWords);

  const wordsToDisplay = words.filter(
    ({ learning }) => learning.progress !== Progress.Learned
  );

  const questions = wordsToDisplay.map((word) => {
    const answer = word.definitions.map((def) => def.definition).join(";\r\n");
    const options = [answer];

    let attempts = 0;

    while (options.length < 4) {
      const randomDef = getRandomDef(words)
        .map((def) => def.definition)
        .join(";\r\n");

      if (!options.includes(randomDef)) {
        options.push(randomDef);
      }

      if (attempts > 1000) {
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
