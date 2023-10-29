import { useCallback, useState } from "react";
import { CalendarContainer } from "./CustomCalendar.styled";
import Calendar from "react-calendar";
import useGetUserActivity from "../../../../hooks/useGetUserActivity";
import { Timestamp } from "firebase/firestore";
import dayjs from "dayjs";

import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

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

const CustomCalendar = () => {
  const [value, onChange] = useState<Value>(new Date());
  const activityLog = useGetUserActivity();

  const activityTileClassName = useCallback(
    ({ date }: { date: Date }) => {
      if (!activityLog) return;

      if (
        activityLog.find(
          (dDate, index) =>
            isSameDay(dDate, date) &&
            (index === 0 ||
              (index > 0 && !isHasPrevious(dDate, activityLog[index - 1]))) &&
            (index === activityLog.length - 1 ||
              (index < activityLog.length - 1 &&
                !isHasNext(dDate, activityLog[index + 1])))
        )
      ) {
        return "user-activity user-activity-single";
      }

      if (
        activityLog.find(
          (dDate, index) =>
            isSameDay(dDate, date) &&
            (index === 0 ||
              (index > 0 && !isHasPrevious(dDate, activityLog[index - 1])))
        )
      ) {
        return "user-activity user-activity-start";
      }

      if (
        activityLog.find(
          (dDate, index) =>
            isSameDay(dDate, date) &&
            (index === activityLog.length - 1 ||
              (index < activityLog.length - 1 &&
                !isHasNext(dDate, activityLog[index + 1])))
        )
      ) {
        return "user-activity user-activity-end";
      }

      if (activityLog.find((dDate) => isSameDay(dDate, date))) {
        return "user-activity";
      }
    },
    [activityLog]
  );

  return (
    <CalendarContainer>
      <Calendar
        onChange={onChange}
        value={value}
        view="month"
        locale="en-EN"
        tileClassName={activityTileClassName}
      />
    </CalendarContainer>
  );
};

export default CustomCalendar;
