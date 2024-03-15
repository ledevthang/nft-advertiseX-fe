import React, { memo } from 'react';
import { IIconProperty } from 'common/type';
import { SvgIcon } from '@material-ui/core';

export function ClearButtonIcon({ width, height, color }: IIconProperty) {
  return (
    <SvgIcon
      width={width}
      height={height}
      viewBox="0 0 10 9"
      style={{ transform: 'scale(1)', width, height }}
    >
      <path
        d="M5.46903 4.85356L8.37631 7.76084L8.26091 7.87623L5.35363 4.96895L5.00008 4.6154L4.64653 4.96895L1.73925 7.87623L1.62385 7.76084L4.53113 4.85356L4.88469 4.5L4.53113 4.14645L1.62385 1.23917L1.73925 1.12378L4.64653 4.03106L5.00008 4.38461L5.35363 4.03106L8.26091 1.12378L8.37631 1.23917L5.46903 4.14645L5.11547 4.5L5.46903 4.85356Z"
        fill={color}
        stroke="#6F6BC5"
      />
    </SvgIcon>
  );
}

export default memo(ClearButtonIcon);
