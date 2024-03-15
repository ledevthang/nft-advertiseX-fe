import React, { memo } from 'react';
import { IIconProperty } from 'common/type';
import { SvgIcon } from '@material-ui/core';

function Solana({ width, height, color }: IIconProperty) {
  return (
    <SvgIcon
      width={width}
      height={height}
      viewBox="0 0 44 34"
      style={{ transform: 'scale(1)', width, height }}
    >
      <g clipPath="url(#clip0_1621_19770)">
        <path
          d="M7.14689 25.9501C7.41241 25.6884 7.77751 25.5356 8.16474 25.5356H43.2807C43.9224 25.5356 44.2432 26.2992 43.7896 26.7464L36.8527 33.5857C36.5872 33.8475 36.2221 34.0002 35.8349 34.0002H0.718924C0.0772341 34.0002 -0.243611 33.2366 0.209998 32.7894L7.14689 25.9501Z"
          fill="url(#paint0_linear_1621_19770)"
        />
        <path
          d="M7.14689 0.414501C7.42348 0.152711 7.78858 0 8.16474 0H43.2807C43.9224 0 44.2432 0.763555 43.7896 1.21078L36.8527 8.05005C36.5872 8.31184 36.2221 8.46455 35.8349 8.46455H0.718924C0.0772341 8.46455 -0.243611 7.70099 0.209998 7.25377L7.14689 0.414501Z"
          fill="url(#paint1_linear_1621_19770)"
        />
        <path
          d="M36.8527 13.1005C36.5872 12.8387 36.2221 12.686 35.8349 12.686H0.718924C0.0772341 12.686 -0.243611 13.4496 0.209998 13.8968L7.14689 20.7361C7.41241 20.9979 7.77751 21.1506 8.16474 21.1506H43.2807C43.9224 21.1506 44.2432 20.387 43.7896 19.9398L36.8527 13.1005Z"
          fill="url(#paint2_linear_1621_19770)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_1621_19770"
          x1="39.9261"
          y1="-4.08541"
          x2="16.16"
          y2="42.086"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00FFA3" />
          <stop offset="1" stopColor="#DC1FFF" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_1621_19770"
          x1="29.2995"
          y1="-9.55549"
          x2="5.53339"
          y2="36.6159"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00FFA3" />
          <stop offset="1" stopColor="#DC1FFF" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_1621_19770"
          x1="34.5789"
          y1="-6.83784"
          x2="10.8129"
          y2="39.3335"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00FFA3" />
          <stop offset="1" stopColor="#DC1FFF" />
        </linearGradient>
        <clipPath id="clip0_1621_19770">
          <rect width="44" height="34" fill="white" />
        </clipPath>
      </defs>
    </SvgIcon>
  );
}

export default memo(Solana);
