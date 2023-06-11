import { job } from 'cron';

export type ISchedule = {
  second?: number;
  minute?: number;
  hour?: number;
  day?: number;
  month?: number;
  week?: number;
};

export const WILDCARD = '*';
export const TIMEZONE = Intl.DateTimeFormat().resolvedOptions().timeZone;

export function runSchedule<T>({
  opt,
  context,
  runOnInit = true,
  onTick,
  onComplete,
}: {
  opt: ISchedule;
  runOnInit?: boolean;
  context?: T;
  onTick?: VoidFunction;
  onComplete?: VoidFunction;
}) {
  // second minute hour day month week
  const { second, minute, hour, day, month, week } = opt;
  const cronTime = [
    second ?? WILDCARD,
    minute ?? WILDCARD,
    hour ?? WILDCARD,
    day ?? WILDCARD,
    month ?? WILDCARD,
    week ?? WILDCARD,
  ].join(' ');
  return job({
    cronTime,
    start: true,
    onTick,
    onComplete,
    context,
    runOnInit,
    timeZone: TIMEZONE,
  });
}
