import React, { memo } from 'react';
import { IIconProperty } from 'common/type';
import { SvgIcon } from '@material-ui/core';

const ArrowNext = ({ width, height, color }: IIconProperty) => {
  return (
    <SvgIcon
      width={width}
      height={height}
      viewBox={`0 0 24 24`}
      style={{ transform: 'scale(1)', width, height }}
    >
      <path
        d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z"
        fill="black"
        fill-opacity="0.16"
      />
    </SvgIcon>
  );
};

export default memo(ArrowNext);
