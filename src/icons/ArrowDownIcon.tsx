import React, { memo } from 'react';
import { IIconProperty } from 'common/type';
import { SvgIcon } from '@material-ui/core';

function ArrowDownIcon(props: IIconProperty) {
  const { width, height, color = '#100113' } = props;

  return (
    <SvgIcon
      width={width}
      height={height}
      viewBox="0 0 8 6"
      style={{ transform: 'scale(1)', width, height }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.94 0.726562L4 3.7799L7.06 0.726562L8 1.66656L4 5.66656L0 1.66656L0.94 0.726562Z"
        fill={color}
      />
    </SvgIcon>
  );
}

export default memo(ArrowDownIcon);
