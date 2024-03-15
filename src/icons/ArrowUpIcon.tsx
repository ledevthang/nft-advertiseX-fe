import React, { memo } from 'react';
import { IIconProperty } from 'common/type';
import { SvgIcon } from '@material-ui/core';

function ArrowUpIcon({ width, height }: IIconProperty) {
  return (
    <SvgIcon
      width={width}
      height={height}
      viewBox="0 0 8 6"
      style={{ transform: 'scale(1)', width, height }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.94 5.27325L4 2.21992L7.06 5.27325L8 4.33325L4 0.333252L0 4.33325L0.94 5.27325Z"
        fill="white"
      />
    </SvgIcon>
  );
}

export default memo(ArrowUpIcon);
