import { Timestamp } from "firebase/firestore";
import dayjs from "dayjs";

const isSameDay = (dDate: Timestamp, date: Date) => {
  return dayjs(dDate.toDate()).isSame(dayjs(date), "day");
};

const isHasPrevious = (dDate: Timestamp, prevDate: Timestamp) => {
  const current = dayjs(dDate.toDate());
  const previous = dayjs(prevDate.toDate()).format("DD/MM/YYYY");

  const prevDateToCurr = current.subtract(1, "day").format("DD/MM/YYYY");

  return prevDateToCurr === previous;
};

const isHasNext = (dDate: Timestamp, nextDate: Timestamp) => {
  const current = dayjs(dDate.toDate());
  const next = dayjs(nextDate.toDate()).format("DD/MM/YYYY");

  const nextDateToCurr = current.add(1, "day").format("DD/MM/YYYY");

  return nextDateToCurr === next;
};

export { isSameDay, isHasNext, isHasPrevious };
