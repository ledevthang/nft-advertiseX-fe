import React, { memo } from 'react';
import { IIconProperty } from 'common/type';
import { SvgIcon } from '@material-ui/core';

const ArrowForwardIos = ({ width, height, color }: IIconProperty) => {
  return (
    <SvgIcon
      width={width}
      height={height}
      viewBox={`0 0 24 24`}
      style={{ transform: 'scale(1)', width, height }}
    >
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M6.23047 20.23L8.00047 22L18.0005 12L8.00047 2L6.23047 3.77L14.4605 12L6.23047 20.23Z"
        fill={color}
      />
    </SvgIcon>
  );
};

export default memo(ArrowForwardIos);
