import React, { memo } from 'react';
import { IIconProperty } from 'common/type';
import { SvgIcon } from '@material-ui/core';

function Grid3x3({ width, height, color }: IIconProperty) {
  return (
    <SvgIcon
      width={width}
      height={height}
      viewBox="0 0 16 16"
      style={{ transform: 'scale(1)', width, height }}
    >
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M13.3332 6.66675V5.33341H10.6665V2.66675H9.33317V5.33341H6.6665V2.66675H5.33317V5.33341H2.6665V6.66675H5.33317V9.33341H2.6665V10.6667H5.33317V13.3334H6.6665V10.6667H9.33317V13.3334H10.6665V10.6667H13.3332V9.33341H10.6665V6.66675H13.3332ZM9.33317 9.33341H6.6665V6.66675H9.33317V9.33341Z"
        fill={color}
      />
    </SvgIcon>
  );
}

export default memo(Grid3x3);
