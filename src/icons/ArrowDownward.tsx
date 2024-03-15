import React, { memo } from 'react';
import { IIconProperty } from 'common/type';
import { SvgIcon } from '@material-ui/core';

function ArrowDownward({ width, height, color }: IIconProperty) {
  return (
    <SvgIcon
      width={width}
      height={height}
      viewBox="0 0 24 24"
      style={{ transform: 'scale(1)', width, height }}
    >
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M20 12L18.59 10.59L13 16.17V4H11V16.17L5.42 10.58L4 12L12 20L20 12Z"
        fill={color}
      />
    </SvgIcon>
  );
}

export default memo(ArrowDownward);
