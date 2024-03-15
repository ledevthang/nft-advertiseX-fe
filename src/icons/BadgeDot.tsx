import React, { memo } from 'react';
import { IIconProperty } from 'common/type';
import { SvgIcon } from '@material-ui/core';

function BadgeDot({ width, height, color }: IIconProperty) {
  return (
    <SvgIcon
      width={width}
      height={height}
      viewBox="0 0 24 24"
      style={{ transform: 'scale(1)', width, height }}
    >
      <rect
        xmlns="http://www.w3.org/2000/svg"
        width="6"
        height="6"
        rx="3"
        fill={color}
      />
    </SvgIcon>
  );
}

export default memo(BadgeDot);
