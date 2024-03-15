import round from 'lodash/round';

const ONE_HOUR_IN_SECOND = 60 * 60;
const ONE_DAY_IN_SECOND = 24 * ONE_HOUR_IN_SECOND;
const ONE_MONTH_IN_SECONDS = 31 * ONE_DAY_IN_SECOND;

export const parseTimeDuration = (time: number): [number, number, number] => {
  const months = Math.floor(time / ONE_MONTH_IN_SECONDS);
  const days = Math.floor(
    (time - months * ONE_MONTH_IN_SECONDS) / ONE_DAY_IN_SECOND,
  );
  const hours = round(
    (time - months * ONE_MONTH_IN_SECONDS - days * ONE_DAY_IN_SECOND) /
      ONE_HOUR_IN_SECOND,
    2,
  );

  return [months, days, hours];
};
