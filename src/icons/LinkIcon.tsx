import React, { memo } from 'react';
import { IIconProperty } from 'common/type';
import { SvgIcon } from '@material-ui/core';

const LinkIcon = ({ width, height, color }: IIconProperty) => {
  return (
    <SvgIcon
      width={width}
      height={height}
      viewBox={`0 0 24 24`}
      style={{ transform: 'scale(1)', width, height }}
    >
      <path
        d="M7 8.4C5.01386 8.4 3.4 10.0139 3.4 12C3.4 13.9861 5.01386 15.6 7 15.6H10.5V16.5H7C4.51614 16.5 2.5 14.4839 2.5 12C2.5 9.51614 4.51614 7.5 7 7.5H10.5V8.4H7ZM15.5 11.5V12.5H8.5V11.5H15.5ZM17 16.5H13.5V15.6H17C18.9861 15.6 20.6 13.9861 20.6 12C20.6 10.0139 18.9861 8.4 17 8.4H13.5V7.5H17C19.4839 7.5 21.5 9.51614 21.5 12C21.5 14.4839 19.4839 16.5 17 16.5Z"
        stroke={color}
      />
    </SvgIcon>
  );
};

export default memo(LinkIcon);
