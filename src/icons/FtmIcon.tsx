import React, { memo } from 'react';
import { IIconProperty } from 'common/type';
import { SvgIcon } from '@material-ui/core';

function FtmIcon({ width, height, color }: IIconProperty) {
  return (
    <SvgIcon
      width={width}
      height={height}
      viewBox="0 0 4 8"
      style={{ transform: 'scale(1)', width, height }}
      fill="none"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M2.375 3.03125L3.5 2.375V3.6875L2.375 3.03125ZM3.5 5.84375L2 6.71875L0.5 5.84375V4.3125L2 5.1875L3.5 4.3125V5.84375ZM0.5 2.375L1.625 3.03125L0.5 3.6875V2.375ZM2.1875 3.34375L3.3125 4L2.1875 4.65625V3.34375ZM1.8125 4.65625L0.6875 4L1.8125 3.34375V4.65625ZM3.3125 2.0625L2 2.8125L0.6875 2.0625L2 1.28125L3.3125 2.0625ZM0.125 1.9375V6.03125L2 7.09375L3.875 6.03125V1.9375L2 0.875L0.125 1.9375Z"
        fill={color}
      />
    </SvgIcon>
  );
}

export default memo(FtmIcon);
