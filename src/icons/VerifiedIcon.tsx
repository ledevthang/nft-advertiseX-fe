import React, { memo } from 'react';
import { IIconProperty } from 'common/type';
import { SvgIcon } from '@material-ui/core';

function VerifiedIcon({ width, height, color }: IIconProperty) {
  return (
    <SvgIcon
      width={width}
      height={height}
      viewBox="0 0 10 11"
      style={{ transform: 'scale(1)', width, height }}
    >
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M9.58317 5.5L8.5665 4.3375L8.70817 2.8L7.204 2.45833L6.4165 1.125L4.99984 1.73333L3.58317 1.125L2.79567 2.45417L1.2915 2.79167L1.43317 4.33333L0.416504 5.5L1.43317 6.6625L1.2915 8.20417L2.79567 8.54583L3.58317 9.875L4.99984 9.2625L6.4165 9.87083L7.204 8.54167L8.70817 8.2L8.5665 6.6625L9.58317 5.5ZM4.204 7.46667L2.62067 5.87917L3.23734 5.2625L4.204 6.23333L6.6415 3.7875L7.25817 4.40417L4.204 7.46667Z"
        fill={color}
      />
    </SvgIcon>
  );
}

export default memo(VerifiedIcon);
