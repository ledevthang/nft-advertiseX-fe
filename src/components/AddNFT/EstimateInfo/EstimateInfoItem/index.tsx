import React, { useState } from 'react';
import {
  Box,
  Tooltip,
  useTheme,
  useMediaQuery,
  ClickAwayListener,
} from '@material-ui/core';

import clsx from 'clsx';
import InformationIcon from 'icons/InformationIcon';
import { useStyles } from './styles';

export interface IEstimateItemInfo {
  label: string;
  value: string;
  isDeadZone?: boolean;
  tooltip?: string;
  displayValue?: string;
}

export default function EstimateItemInfo(props: IEstimateItemInfo) {
  const { label, value, isDeadZone, tooltip, displayValue } = props;
  const classes = useStyles(props);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const [tooltipMb, setTooltipMb] = useState<boolean>(false);
  return (
    <Box className={clsx(classes.container)}>
      <div className={classes.labelContainer}>
        <span
          className={clsx(classes.label, { [classes.mobileLabel]: isMobile })}
        >
          {label}
        </span>
        {isDesktop ? (
          <Tooltip
            title={tooltip || ''}
            classes={{ tooltip: classes.tooltipText }}
          >
            <div>
              <InformationIcon width={11.67} height={11.67} />
            </div>
          </Tooltip>
        ) : (
          <ClickAwayListener onClickAway={() => setTooltipMb(false)}>
            <Tooltip
              title={tooltip || ''}
              classes={{ tooltip: classes.tooltipText }}
              disableFocusListener
              disableHoverListener
              disableTouchListener
              open={tooltipMb}
            >
              <div onClick={() => setTooltipMb(!tooltipMb)}>
                <InformationIcon width={11.67} height={11.67} />
              </div>
            </Tooltip>
          </ClickAwayListener>
        )}
      </div>
      <Tooltip title={value}>
        <div
          className={clsx(classes.value, {
            [classes.deadZoneValue]: isDeadZone,
          })}
        >
          <span>{displayValue || value}</span>
        </div>
      </Tooltip>
    </Box>
  );
}
