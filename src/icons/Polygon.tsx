import React, { memo } from 'react';
import { IIconProperty } from 'common/type';
import { SvgIcon } from '@material-ui/core';

function Polygon({ width, height, color }: IIconProperty) {
  return (
    <SvgIcon
      width={width}
      height={height}
      viewBox="0 0 39 34"
      style={{ transform: 'scale(1)', width, height }}
    >
      <g clipPath="url(#clip0_1621_19767)">
        <path
          d="M29 10.1999C28.3 9.7999 27.4 9.7999 26.6 10.1999L21 13.4999L17.2 15.5999L11.7 18.8999C11 19.2999 10.1 19.2999 9.3 18.8999L5 16.2999C4.3 15.8999 3.8 15.0999 3.8 14.1999V9.1999C3.8 8.3999 4.2 7.5999 5 7.0999L9.3 4.5999C10 4.1999 10.9 4.1999 11.7 4.5999L16 7.1999C16.7 7.5999 17.2 8.3999 17.2 9.2999V12.5999L21 10.3999V6.9999C21 6.1999 20.6 5.3999 19.8 4.8999L11.8 0.199902C11.1 -0.200098 10.2 -0.200098 9.4 0.199902L1.2 4.9999C0.4 5.3999 0 6.1999 0 6.9999V16.3999C0 17.1999 0.4 17.9999 1.2 18.4999L9.3 23.1999C10 23.5999 10.9 23.5999 11.7 23.1999L17.2 19.9999L21 17.7999L26.5 14.5999C27.2 14.1999 28.1 14.1999 28.9 14.5999L33.2 17.0999C33.9 17.4999 34.4 18.2999 34.4 19.1999V24.1999C34.4 24.9999 34 25.7999 33.2 26.2999L29 28.7999C28.3 29.1999 27.4 29.1999 26.6 28.7999L22.3 26.2999C21.6 25.8999 21.1 25.0999 21.1 24.1999V20.9999L17.3 23.1999V26.4999C17.3 27.2999 17.7 28.0999 18.5 28.5999L26.6 33.2999C27.3 33.6999 28.2 33.6999 29 33.2999L37.1 28.5999C37.8 28.1999 38.3 27.3999 38.3 26.4999V16.9999C38.3 16.1999 37.9 15.3999 37.1 14.8999L29 10.1999Z"
          fill="#8247E5"
        />
      </g>
      <defs>
        <clipPath id="clip0_1621_19767">
          <rect width="38.4" height="33.5" fill="white" />
        </clipPath>
      </defs>
    </SvgIcon>
  );
}

export default memo(Polygon);