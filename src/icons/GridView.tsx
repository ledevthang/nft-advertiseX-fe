import React, { memo } from 'react';
import { IIconProperty } from 'common/type';
import { SvgIcon } from '@material-ui/core';

function GridView({ width, height, color }: IIconProperty) {
  return (
    <SvgIcon
      width={width}
      height={height}
      viewBox="0 0 21 21"
      style={{ transform: 'scale(1)', width, height }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 0V8H8V0H0ZM6 6H2V2H6V6ZM0 10V18H8V10H0ZM6 16H2V12H6V16ZM10 0V8H18V0H10ZM16 6H12V2H16V6ZM10 10V18H18V10H10ZM16 16H12V12H16V16Z"
        fill={color}
      />
    </SvgIcon>
  );
}

export default memo(GridView);
