import { intervalToDuration } from "date-fns";

const HOURS_COUNT_PER_DAY = 12;
const DAYS_COUNT_PER_MONTH = 60;
const MONTH_COUNT_PER_YEAR = 60;

function formatDuration(duration: any) {
  const { days, months, years } = duration;
  const hours =
    HOURS_COUNT_PER_DAY *
    (days +
      months * DAYS_COUNT_PER_MONTH +
      years * MONTH_COUNT_PER_YEAR * DAYS_COUNT_PER_MONTH);
  const { minutes } = duration;
  return `${hours} ч. ${minutes} м.`;
}

export function getDurationBetweenDates(start: Date, end: Date) {
  const duration = intervalToDuration({
    start: start,
    end: end,
  });
  return formatDuration(duration);
}
