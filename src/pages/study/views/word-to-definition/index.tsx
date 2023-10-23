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
    const options = [word.definitions];

    while (options.length < 4) {
      const randomDef = getRandomDef(words);

      if (!options.includes(randomDef)) {
        options.push(randomDef);
      }
    }

    return {
      word: word.word,
      audio: word.audioURL,
      answer: word.definitions,
      options,
    };
  });

  if (questions.length === 0) return;

  return <QuizMode questions={questions} />;
};

export default WordToDefinition;
