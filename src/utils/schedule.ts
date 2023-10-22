import dayjs from "dayjs";
import { Answer, Word } from "../types";

const schedule = (answer: Answer, word: Word) => {
  const interval = getInterval(answer, word);
  const factor = getFactor(answer, word.learning.factor);
  const dueDate = dayjs(word.learning.dueDate.toDate())
    .add(interval, "day")
    .toDate();

  return { interval, factor, dueDate };
};

const getInterval = (answer: Answer, { learning }: Word) => {
  const delay = dayjs().diff(dayjs(learning.dueDate.toDate()), "day");
  const i1 = 0 * learning.interval;
  const i2 = Math.max(
    learning.interval + 1,
    (learning.interval + delay / 4) * 1.2 * 1
  );
  const i3 = Math.max(
    i2 + 1,
    (learning.interval + delay / 2) * (learning.factor / 1000) * 1
  );
  const i4 = Math.max(
    i3 + 1,
    (learning.interval + delay) * (learning.factor / 1000) * 1.3
  );

  switch (answer) {
    case Answer.Fail:
      return i1;
    case Answer.PassHard:
      return i2;
    case Answer.Pass:
      return i3;
    case Answer.PassEasy:
      return i4;
    default:
      return 0;
  }
};

const getFactor = (answer: Answer, factor: number) => {
  switch (answer) {
    case Answer.Fail:
      return Math.max(1300, factor - 200);
    case Answer.PassHard:
      return Math.max(1300, factor - 150);
    case Answer.Pass:
      return factor;
    case Answer.PassEasy:
      return Math.max(1300, factor + 150);
    default:
      return 2500;
  }
};

export { schedule };
