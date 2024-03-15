import React, { memo } from 'react';
import { IIconProperty } from 'common/type';
import { SvgIcon } from '@material-ui/core';

function EthIconNew({ width, height, color }: IIconProperty) {
  return (
    <SvgIcon
      width={width}
      height={height}
      viewBox="0 0 8 11"
      style={{ transform: 'scale(1)', width, height }}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <path
        d="M3.93966 0.166656L3.86816 0.409662V7.46112L3.93966 7.53249L7.21287 5.5977L3.93966 0.166656Z"
        fill="black"
      />
      <path
        d="M3.93971 0.166656L0.666504 5.5977L3.93971 7.53251V4.10995V0.166656Z"
        fill="#8C8C8C"
      />
      <path
        d="M3.9397 8.15226L3.89941 8.20137V10.7133L3.9397 10.8309L7.21485 6.21844L3.9397 8.15226Z"
        fill="#3C3C3B"
      />
      <path
        d="M3.93971 10.8309V8.1522L0.666504 6.21838L3.93971 10.8309Z"
        fill="#8C8C8C"
      />
      <path
        d="M3.93945 7.53247L7.21261 5.59771L3.93945 4.10995V7.53247Z"
        fill="#141414"
      />
      <path
        d="M0.666504 5.59771L3.93966 7.53247V4.10995L0.666504 5.59771Z"
        fill="#393939"
      />
    </SvgIcon>
  );
}

export default memo(EthIconNew);
