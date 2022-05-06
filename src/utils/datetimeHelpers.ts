export const calculateEndDatetime = (
  dateStart: string,
  timeStart: string,
  duration: string
) => {
  const [day, month, year] = dateStart.split(".").map(Number);
  const [hours, minutes] = timeStart.split(":").map(Number);
  const [durationHours, durationMinutes] = duration.split(":").map(Number);

  const dateObj = new Date(year, month - 1, day, hours, minutes);
  dateObj.setHours(dateObj.getHours() + durationHours);
  dateObj.setMinutes(dateObj.getMinutes() + durationMinutes);

  const _dateEnd = [
    dateObj.getDate(),
    dateObj.getMonth() + 1,
    dateObj.getFullYear(),
  ]
    .map((x) => x.toString().padStart(2, "0"))
    .join(".");

  const _timeEnd = [dateObj.getHours(), dateObj.getMinutes()]
    .map((x) => x.toString().padStart(2, "0"))
    .join(":");

  return [_dateEnd, _timeEnd];
};

export const calculateDuration = (
  dateStart: string,
  timeStart: string,
  dateEnd: string,
  timeEnd: string
) => {
  const [dayStart, monthStart, yearStart] = dateStart.split(".").map(Number);
  const [hoursStart, minutesStart] = timeStart.split(":").map(Number);
  const [dayEnd, monthEnd, yearEnd] = dateEnd.split(".").map(Number);
  const [hoursEnd, minutesEnd] = timeEnd.split(":").map(Number);

  const datetimeStart = new Date(
    yearStart,
    monthStart - 1,
    dayStart,
    hoursStart,
    minutesStart
  ).getTime();
  const datetimeEnd = new Date(
    yearEnd,
    monthEnd - 1,
    dayEnd,
    hoursEnd,
    minutesEnd
  ).getTime();

  const hourDiff = datetimeEnd - datetimeStart;
  const minDiff = hourDiff / 60 / 1000;
  const hDiff = hourDiff / 3600 / 1000;

  const hours = Math.floor(hDiff);
  const minutes = minDiff - 60 * hours;

  return [hours, minutes].map((x) => x.toString().padStart(2, "0")).join(":");
};

export const formatTimeString = (time: string) => {
  return time.split(":").slice(0, 2).join(":");
};