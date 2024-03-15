import React from 'react';
import { Grid } from '@material-ui/core';
import clsx from 'clsx';
import EstimateItemInfo, { IEstimateItemInfo } from './EstimateInfoItem';
import { useStyles } from './styles';

export interface IEstimateInfo {
  informations: IEstimateItemInfo[];
  className?: string;
}

export default function EstimateInfo(props: IEstimateInfo) {
  const { informations } = props;
  const classes = useStyles();

  return (
    <Grid container xs={12}>
      {informations.map((info, index) => (
        <Grid
          item
          xs={6}
          md={3}
          className={clsx(
            { [classes.lastInfoItem]: index === 3 },
            classes.item,
          )}
          key={index}
        >
          <EstimateItemInfo
            label={info.label}
            value={info.value}
            isDeadZone={info.isDeadZone}
            tooltip={info.tooltip}
            displayValue={info.displayValue}
          />
        </Grid>
      ))}
    </Grid>
  );
}
