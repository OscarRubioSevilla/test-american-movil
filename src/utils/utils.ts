import moment, { Moment } from "moment";

export function roundToNearestHalfHour(date: string): Moment {
  const momentDate = moment(date);
  const minutes = momentDate.minute();
  const roundedMinutes = Math.floor(minutes / 30) * 30;
  return momentDate.minute(roundedMinutes).second(0);
}

export function getDateHeader(start: string) : string[] {
  const currentMoment = roundToNearestHalfHour(start);
  const endMoment = moment().add(1, "days");
  const dates: string[] = [];
  while (currentMoment.isBefore(endMoment)) {
    dates.push(currentMoment.format("HH:mm"));
    currentMoment.add(30, "minute");
  }
  return dates;
}

export function getDateFromString(strDate: string) : string {
 
  if (!/^\d{14}$/.test(strDate) || !strDate.trim()) {
    return strDate;
  }
  const year = strDate.substring(0, 4);
  const month = strDate.substring(4, 6);
  const day = strDate.substring(6, 8);
  const hours = strDate.substring(8, 10);
  const minutes = strDate.substring(10, 12);
  const seconds = strDate.substring(12, 14);

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`

}

export function setDateToString(date: Moment): string {
  const roundDateStr = roundToNearestHalfHour(date.format('YYYY-MM-DD HH:mm:ss'));
  return moment(roundDateStr).format('YYYYMMDDHHmmss')
}


interface EventTimeProps {
  date_begin: string,
  date_end: string,
  duration: string
} 
export function formatEventTime ({ date_begin, date_end, duration = ''}: EventTimeProps) {
 
  const dateStart = moment(date_begin).format('HH.mm');
  const dateEnd= moment(date_end).format('HH.mm');
  const [hours, minutes] = duration?.split(':')
  return `${dateStart}hs a ${dateEnd}hs ${parseInt(hours)}h ${ parseInt(minutes)}min`
}
