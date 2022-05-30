import { intervalToDuration } from "date-fns";

const HOURS_COUNT_PER_DAY = 24;
const DAYS_COUNT_PER_MONTH = 30;
const MONTH_COUNT_PER_YEAR = 12;

function formatDuration(duration: any) {
  const { days, months, years, hours, minutes } = duration;
  const sumHours =
    hours +
    HOURS_COUNT_PER_DAY *
      (days +
        months * DAYS_COUNT_PER_MONTH +
        years * MONTH_COUNT_PER_YEAR * DAYS_COUNT_PER_MONTH);
  return (
    (sumHours !== 0 ? `${sumHours} ч.` : "") +
    (minutes !== 0 ? `${minutes} м.` : "")
  );
}

export function getDurationBetweenDates(start: Date, end: Date) {
  let endDate = end;
  console.log(start, end);
  if (end.toString() === "Invalid Date") {
    endDate = new Date();
  }
  const duration = intervalToDuration({
    start: start,
    end: endDate,
  });
  return formatDuration(duration);
}
