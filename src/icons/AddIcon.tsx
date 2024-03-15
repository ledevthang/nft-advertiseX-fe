import React, { memo } from 'react';
import { IIconProperty } from 'common/type';
import { SvgIcon } from '@material-ui/core';

function AddIcon({ width, height, color }: IIconProperty) {
  return (
    <SvgIcon
      width={width}
      height={height}
      viewBox="0 0 24 24"
      style={{ transform: 'scale(1)', width, height }}
    >
      <path
        d="M13 11.5H18.5V12.5H13H12.5V13V18.5H11.5V13V12.5H11H5.5V11.5H11H11.5V11V5.5H12.5V11V11.5H13Z"
        fill="black"
        fillOpacity="0.54"
        stroke={color}
      />
    </SvgIcon>
  );
}

export default memo(AddIcon);
