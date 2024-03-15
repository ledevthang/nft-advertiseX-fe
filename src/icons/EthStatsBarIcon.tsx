import React, { memo } from 'react';
import { IIconProperty } from 'common/type';
import { SvgIcon } from '@material-ui/core';

function EthStatsBarIcon({ width, height, color }: IIconProperty) {
  return (
    <SvgIcon
      width={width}
      height={height}
      viewBox="0 0 10 16"
      style={{ transform: 'scale(1)', width, height }}
    >
      <svg
        width="10"
        height="16"
        viewBox="0 0 10 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_867_24592)">
          <path
            d="M4.99837 0L4.89087 0.364508V10.9417L4.99837 11.0487L9.91998 8.14657L4.99837 0Z"
            fill="#3F6F93"
          />
          <path
            d="M4.99852 0L0.0769043 8.14657L4.99852 11.0488V5.91494V0Z"
            fill="#65AEBF"
          />
          <path
            d="M4.99857 11.9784L4.93799 12.0521V15.8199L4.99857 15.9964L9.9231 9.07766L4.99857 11.9784Z"
            fill="#3F6F93"
          />
          <path
            d="M4.99852 15.9964V11.9783L0.0769043 9.07761L4.99852 15.9964Z"
            fill="#65AEBF"
          />
          <path
            d="M4.99854 11.0487L9.92007 8.1466L4.99854 5.91496V11.0487Z"
            fill="#1C0222"
          />
          <path
            d="M0.0769043 8.1466L4.99844 11.0487V5.91497L0.0769043 8.1466Z"
            fill="#3F6F93"
          />
        </g>
        <defs>
          <clipPath id="clip0_867_24592">
            <rect
              width="9.84615"
              height="16"
              fill="white"
              transform="translate(0.0769043)"
            />
          </clipPath>
        </defs>
      </svg>
    </SvgIcon>
  );
}

export default memo(EthStatsBarIcon);
