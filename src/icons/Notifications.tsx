import React, { memo } from 'react';
import { IIconProperty } from 'common/type';
import { SvgIcon } from '@material-ui/core';

function Notifications({ width, height, color }: IIconProperty) {
  return (
    <SvgIcon
      width={width}
      height={height}
      viewBox="0 0 24 24"
      style={{ transform: 'scale(1)', width, height }}
    >
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M12 22.5C13.1 22.5 14 21.6 14 20.5H10C10 21.6 10.89 22.5 12 22.5ZM18 16.5V11.5C18 8.43 16.36 5.86 13.5 5.18V4.5C13.5 3.67 12.83 3 12 3C11.17 3 10.5 3.67 10.5 4.5V5.18C7.63 5.86 6 8.42 6 11.5V16.5L4 18.5V19.5H20V18.5L18 16.5Z"
        fill={color}
      />
    </SvgIcon>
  );
}

export default memo(Notifications);
