import React, { memo } from 'react';
import { IIconProperty } from 'common/type';

function AVAXIcon({ width, height, color }: IIconProperty) {
  return (
    <svg
      width={width}
      height={height}
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 507.2 507.2"
    >
      <title>avalanche-avax</title>
      <circle fill="#e84142" cx="253.6" cy="253.6" r="253.6" />
      <path
        fill="#fff"
        d="M343.06,260.19c8.79-15.18,23-15.18,31.75,0l54.71,96.05c8.79,15.17,1.6,27.55-16,27.55H303.32c-17.37,0-24.56-12.38-16-27.55ZM237.23,75.28c8.78-15.17,22.76-15.17,31.55,0l12.18,22,28.75,50.52a52.46,52.46,0,0,1,0,45.72L213.26,360.63a50.66,50.66,0,0,1-39.53,23.16H93.65c-17.57,0-24.76-12.18-16-27.55Z"
      />
    </svg>
  );
}

export default memo(AVAXIcon);
