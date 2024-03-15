import React, { memo } from 'react';
import { IIconProperty } from 'common/type';
import { SvgIcon } from '@material-ui/core';

function HyphenIcon(props: IIconProperty) {
  const { width, height, color = '#6F6BC5' } = props;

  return (
    <SvgIcon
      width={width}
      height={height}
      viewBox="0 0 10 2"
      style={{ transform: 'scale(1)', width, height }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <svg
        width="10"
        height="2"
        viewBox="0 0 10 2"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.16634 1.16671H0.833008V0.833374H9.16634V1.16671Z"
          fill={color}
          stroke={color}
        />
      </svg>
    </SvgIcon>
  );
}

export default memo(HyphenIcon);

<svg
  width="10"
  height="2"
  viewBox="0 0 10 2"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M9.16634 1.16671H0.833008V0.833374H9.16634V1.16671Z"
    fill="#6F6BC5"
    stroke="#6F6BC5"
  />
</svg>;
