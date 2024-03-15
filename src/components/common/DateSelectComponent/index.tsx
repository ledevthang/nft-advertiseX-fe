import React, { useCallback, useMemo } from 'react';
import { Grid } from '@material-ui/core';
import clsx from 'clsx';
import StepInputComponent from '../StepInputComponent';
import { GetNftEstimateParams } from 'types/addNft';
import { useStyles } from './styles';
import {
  daysToParamEstimate,
  hoursToParamEstimate,
  caculateTotalDays,
} from 'utils/validateAddNFT';

const MINIMUM_HOUR = '0.2';

export interface IDateSelectComponent {
  months?: string;
  days?: string;
  hours?: string;
  className?: string;
  onChange: (params: GetNftEstimateParams) => void;
  isEdit?: boolean;
}

export default function DateSelectComponent(props: IDateSelectComponent) {
  const { months, days, hours, className, onChange, isEdit } = props;
  const classes = useStyles(props);

  const totalDaysValue = useMemo(() => {
    return caculateTotalDays(Number(months), Number(days), Number(hours));
  }, [months, days, hours]);

  const onChangeMonth = useCallback(
    (months?: string) => {
      onChange({ months });
    },
    [onChange],
  );

  const onChangeDay = useCallback(
    (days?: string, months?: string) => {
      if (months) onChange({ days, months });
      else onChange({ days });
    },
    [onChange],
  );

  const onChangeHour = useCallback(
    (hours?: string, days?: string, months?: string) => {
      if (days && months) onChange({ hours, days, months });
      else onChange({ hours });
    },
    [onChange],
  );

  const resetToMimiTime = useCallback(() => {
    if (totalDaysValue * 24 < 0.2 && totalDaysValue !== 0)
      onChangeHour(MINIMUM_HOUR);
  }, [totalDaysValue, onChangeHour]);

  const onBlurMonths = useCallback(() => {
    resetToMimiTime();
  }, [resetToMimiTime]);

  const onBlurDays = useCallback(() => {
    resetToMimiTime();
    if (Number(days) > 31) {
      const { convertedMonths, convertedDays } = daysToParamEstimate(
        Number(months),
        Number(days),
      );
      onChangeDay(convertedDays, convertedMonths);
    }
  }, [days, months, resetToMimiTime, onChangeDay]);

  const onBlurHours = useCallback(() => {
    resetToMimiTime();
    if (Number(hours) > 24) {
      const { convertedMonths, convertedDays, convertedHours } =
        hoursToParamEstimate(Number(months), Number(days), Number(hours));
      onChangeHour(convertedHours, convertedDays, convertedMonths);
    }
  }, [hours, days, months, resetToMimiTime, onChangeHour]);

  return (
    <Grid container xs={12} className={clsx(classes.container, className)}>
      <Grid item xs={4}>
        <StepInputComponent
          label="Months"
          value={months}
          placeholder="0"
          step={1}
          onChange={onChangeMonth}
          className={classes.item}
          range={[0, undefined]}
          isEdit={isEdit}
          onBlur={onBlurMonths}
        />
      </Grid>
      <Grid item xs={4}>
        <StepInputComponent
          label="Days"
          value={days}
          placeholder="0"
          range={[0, undefined]}
          step={1}
          onChange={onChangeDay}
          className={classes.item}
          isEdit={isEdit}
          onBlur={onBlurDays}
        />
      </Grid>
      <Grid item xs={4}>
        <StepInputComponent
          label="Hours"
          value={hours}
          placeholder="0"
          range={[0, undefined]}
          step={1}
          onChange={onChangeHour}
          className={classes.item}
          isEdit={isEdit}
          onBlur={onBlurHours}
        />
      </Grid>
    </Grid>
  );
}
