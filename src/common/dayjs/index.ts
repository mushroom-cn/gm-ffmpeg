import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import duration from 'dayjs/plugin/duration';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { LocaleLang } from '../constants';

dayjs.locale(LocaleLang.En);
// dayjs.locale('zh-cn');
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration);

export const getLang = () => dayjs.locale();

export const changeLang = (lang: LocaleLang = LocaleLang.En) =>
  dayjs().locale(lang);
