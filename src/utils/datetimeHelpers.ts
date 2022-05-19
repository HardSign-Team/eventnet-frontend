const normalizeNumber = (num: number) => {
  return num.toString().padStart(2, "0");
};

export const createDateFrom = (date: string, time: string) => {
  const [day, month, year] = date.split(".").map(Number);
  const [hours, minutes] = time.split(":").map(Number);

  return new Date(year, month - 1, day, hours, minutes);
};

export const calculateEndDatetime = (
  dateStart: string,
  timeStart: string,
  duration: string
) => {
  const [durationHours, durationMinutes] = duration.split(":").map(Number);

  const dateObj = createDateFrom(dateStart, timeStart);
  dateObj.setHours(dateObj.getHours() + durationHours);
  dateObj.setMinutes(dateObj.getMinutes() + durationMinutes);

  const _dateEnd = [
    dateObj.getDate(),
    dateObj.getMonth() + 1,
    dateObj.getFullYear(),
  ]
    .map((x) => normalizeNumber(x))
    .join(".");

  const _timeEnd = [dateObj.getHours(), dateObj.getMinutes()]
    .map((x) => normalizeNumber(x))
    .join(":");

  return [_dateEnd, _timeEnd];
};

export const calculateDuration = (
  dateStart: string,
  timeStart: string,
  dateEnd: string,
  timeEnd: string
) => {
  const datetimeStart = createDateFrom(dateStart, timeStart).getTime();
  const datetimeEnd = createDateFrom(dateEnd, timeEnd).getTime();

  const hourDiff = datetimeEnd - datetimeStart;
  const minDiff = hourDiff / 60 / 1000;
  const hDiff = hourDiff / 3600 / 1000;

  const hours = Math.floor(hDiff);
  const minutes = minDiff - 60 * hours;

  return [hours, minutes].map((x) => normalizeNumber(x)).join(":");
};

export const formatTimeString = (time: string) => {
  return time.split(":").slice(0, 2).join(":");
};
