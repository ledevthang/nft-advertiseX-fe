import React, { memo } from 'react';
import { IIconProperty } from 'common/type';
import { SvgIcon } from '@material-ui/core';

function DeleteIcon({ width, height, color }: IIconProperty) {
  return (
    <SvgIcon
      width={width}
      height={height}
      viewBox="0 0 25 24"
      style={{ transform: 'scale(1)', width, height }}
    >
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M6.5 19C6.5 20.1 7.4 21 8.5 21H16.5C17.6 21 18.5 20.1 18.5 19V7H6.5V19ZM19.5 4H16L15 3H10L9 4H5.5V6H19.5V4Z"
        fill={color}
      />
    </SvgIcon>
  );
}

export default memo(DeleteIcon);
