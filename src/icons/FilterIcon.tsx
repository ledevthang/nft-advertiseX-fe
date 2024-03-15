import React, { memo } from 'react';
import { IIconProperty } from 'common/type';
import { SvgIcon } from '@material-ui/core';

function FilterIcon({ width, height, color }: IIconProperty) {
  return (
    <SvgIcon
      width={width}
      height={height}
      viewBox="0 0 24 24"
      style={{ transform: 'scale(1)', width, height }}
    >
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M4.25018 5.61C6.27018 8.2 10.0002 13 10.0002 13V19C10.0002 19.55 10.4502 20 11.0002 20H13.0002C13.5502 20 14.0002 19.55 14.0002 19V13C14.0002 13 17.7202 8.2 19.7402 5.61C20.2502 4.95 19.7802 4 18.9502 4H5.04018C4.21018 4 3.74018 4.95 4.25018 5.61Z"
        fill={color}
      />{' '}
    </SvgIcon>
  );
}

export default memo(FilterIcon);
