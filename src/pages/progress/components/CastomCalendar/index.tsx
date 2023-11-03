import { useCallback, useState } from "react";
import { CalendarContainer } from "./CustomCalendar.styled";
import Calendar from "react-calendar";
import { Timestamp } from "firebase/firestore";

import "react-calendar/dist/Calendar.css";
import {
  isHasNext,
  isHasPrevious,
  isSameDay,
} from "../../../../utils/dateComparison";

interface CustomCalendarProps {
  activityLog: Timestamp[];
  setRowHeight: (rowHeight: number) => void;
}

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const CustomCalendar = ({ activityLog, setRowHeight }: CustomCalendarProps) => {
  const [value, onChange] = useState<Value>(new Date());

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
        onActiveStartDateChange={() => {
          setTimeout(() => {
            const calendar = document.querySelector(".react-calendar");
            const calendarHeight = calendar ? calendar.clientHeight : 0;
            setRowHeight(calendarHeight);
          }, 0);
        }}
      />
    </CalendarContainer>
  );
};

export default CustomCalendar;
