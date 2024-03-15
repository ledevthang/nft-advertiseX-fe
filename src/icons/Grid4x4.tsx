import React, { memo } from 'react';
import { IIconProperty } from 'common/type';
import { SvgIcon } from '@material-ui/core';

function Grid4x4({ width, height, color }: IIconProperty) {
  return (
    <SvgIcon
      width={width}
      height={height}
      viewBox="0 0 16 16"
      style={{ transform: 'scale(1)', width, height }}
    >
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M14.6668 4.66659V3.33325H12.6668V1.33325H11.3335V3.33325H8.66683V1.33325H7.3335V3.33325H4.66683V1.33325H3.3335V3.33325H1.3335V4.66659H3.3335V7.33325H1.3335V8.66659H3.3335V11.3333H1.3335V12.6666H3.3335V14.6666H4.66683V12.6666H7.3335V14.6666H8.66683V12.6666H11.3335V14.6666H12.6668V12.6666H14.6668V11.3333H12.6668V8.66659H14.6668V7.33325H12.6668V4.66659H14.6668ZM4.66683 4.66659H7.3335V7.33325H4.66683V4.66659ZM4.66683 11.3333V8.66659H7.3335V11.3333H4.66683ZM11.3335 11.3333H8.66683V8.66659H11.3335V11.3333ZM11.3335 7.33325H8.66683V4.66659H11.3335V7.33325Z"
        fill={color}
      />
    </SvgIcon>
  );
}

export default memo(Grid4x4);
