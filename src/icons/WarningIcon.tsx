import React, { memo } from 'react';
import { IIconProperty } from 'common/type';
import { SvgIcon } from '@material-ui/core';

function WarningIcon({ width, height, color }: IIconProperty) {
  return (
    <SvgIcon
      width={width}
      height={height}
      viewBox="0 0 16 16"
      style={{ transform: 'scale(1)', width, height }}
    >
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M0.666748 13.9999H15.3334L8.00008 1.33325L0.666748 13.9999ZM8.66675 11.9999H7.33341V10.6666H8.66675V11.9999ZM8.66675 9.33325H7.33341V6.66659H8.66675V9.33325Z"
        fill="#ED5050"
      />
    </SvgIcon>
  );
}

export default memo(WarningIcon);
