import React, { memo } from 'react';
import { IIconProperty } from 'common/type';
import { SvgIcon } from '@material-ui/core';

function CheckCircle({ width, height, color }: IIconProperty) {
  return (
    <SvgIcon
      width={width}
      height={height}
      viewBox="0 0 24 24"
      style={{ transform: 'scale(1)', width, height }}
    >
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M9.64645 17.3536L10 17.7071L10.3536 17.3536L19.3536 8.35355L19.7059 8.00125L19.3548 7.6477L17.9448 6.2277L17.5913 5.87164L17.2364 6.22645L9.99951 13.4634L6.76306 10.236L6.40951 9.88339L6.05645 10.2364L4.64645 11.6464L4.29289 12L4.64645 12.3536L9.64645 17.3536ZM2.5 12C2.5 6.75614 6.75614 2.5 12 2.5C17.2439 2.5 21.5 6.75614 21.5 12C21.5 17.2439 17.2439 21.5 12 21.5C6.75614 21.5 2.5 17.2439 2.5 12Z"
        fill={color}
        stroke={color}
      />
    </SvgIcon>
  );
}

export default memo(CheckCircle);
