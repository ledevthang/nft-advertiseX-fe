import React, { memo } from 'react';
import { IIconProperty } from 'common/type';
import { SvgIcon } from '@material-ui/core';

function IconLogoSmall({ width, height }: IIconProperty) {
  return (
    <SvgIcon
      width={width}
      height={height}
      viewBox="0 0 37 48"
      fill="none"
      style={{ width, height }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        width="37"
        height="48"
        d="M12.5828 0L3.70752 27.3058L14.7923 35.1876L24.3417 24.3549L12.5828 0Z"
        fill="#65AEBF"
      />
      <path
        d="M33.1797 27.5673L30.8579 18.0047L12.583 0L24.3419 24.3549L33.1797 27.5673Z"
        fill="#6F6BC5"
      />
      <path
        d="M26.4385 45.7961L33.1793 27.5673L24.3414 24.3549L14.792 35.1875L26.4385 45.7961Z"
        fill="#3F6F93"
      />
      <path
        d="M3.70752 27.3058L12.8075 36.495L26.4388 45.7961L14.7923 35.1876L3.70752 27.3058Z"
        fill="#0F3A44"
      />
      <path
        d="M32.7301 25.6996L33.1795 27.5673L26.4387 45.7961L12.8074 36.4949L3.70741 27.3058L4.23169 25.6996H0V48H36.8869V25.6996H32.7301Z"
        fill="#1C0222"
      />
    </SvgIcon>
  );
}

export default memo(IconLogoSmall);
