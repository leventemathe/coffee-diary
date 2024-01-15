import dayjs from "dayjs";

export function getDateTimeString(date: Date) {
  return dayjs(date).format("YYYY-MM-DD HH:mm");
}
