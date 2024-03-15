import React, { memo } from 'react';
import { IIconProperty } from 'common/type';
import { SvgIcon } from '@material-ui/core';

function ChangeHistory({ width, height, color }: IIconProperty) {
  return (
    <SvgIcon
      width={width}
      height={height}
      viewBox="0 0 24 24"
      style={{ transform: 'scale(1)', width, height }}
    >
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M12 7.77L18.39 18H5.61L12 7.77ZM12 4L2 20H22L12 4Z"
        fill={color}
      />
    </SvgIcon>
  );
}

export default memo(ChangeHistory);
