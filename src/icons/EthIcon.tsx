import React, { memo } from 'react';
import { IIconProperty } from 'common/type';
import { SvgIcon } from '@material-ui/core';

function EthIcon({ width, height, color }: IIconProperty) {
  return (
    <SvgIcon
      width={width}
      height={height}
      viewBox="0 0 9 14"
      style={{ transform: 'scale(1)', width, height }}
    >
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M4.29567 10.4825L0 7.945L4.29508 14L8.59425 7.945L4.29392 10.4825H4.29567ZM4.361 0L0.0641667 7.13008L4.36042 9.66992L8.65667 7.13242L4.361 0Z"
        fill={color}
      />
    </SvgIcon>
  );
}

export default memo(EthIcon);
