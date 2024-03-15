import React, { memo } from 'react';
import { IIconProperty } from 'common/type';
import { SvgIcon } from '@material-ui/core';

function EthBlackSmallIcon({ width, height, color }: IIconProperty) {
  return (
    <SvgIcon
      width={width}
      height={height}
      viewBox="0 0 8 12"
      style={{ transform: 'scale(1)', width, height }}
      fill="none"
    >
      <path
        d="M3.97478 8.73625L0.599609 6.7425L3.97432 11.5L7.35223 6.7425L3.9734 8.73625H3.97478ZM4.02611 0.5L0.650026 6.10221L4.02565 8.09779L7.40128 6.10404L4.02611 0.5Z"
        fill="#100113"
      />
    </SvgIcon>
  );
}

export default memo(EthBlackSmallIcon);
