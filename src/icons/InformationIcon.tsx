import React, { memo } from 'react';
import { IIconProperty } from 'common/type';
import { SvgIcon } from '@material-ui/core';

function InformationIcon(props: IIconProperty) {
  const { width, height, color } = props;

  return (
    <SvgIcon
      width={width}
      height={height}
      viewBox="0 0 12 13"
      style={{ transform: 'scale(1)', width, height }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.99984 0.666748C2.77984 0.666748 0.166504 3.28008 0.166504 6.50008C0.166504 9.72008 2.77984 12.3334 5.99984 12.3334C9.21984 12.3334 11.8332 9.72008 11.8332 6.50008C11.8332 3.28008 9.21984 0.666748 5.99984 0.666748ZM6.58317 9.41675H5.4165V5.91675H6.58317V9.41675ZM6.58317 4.75008H5.4165V3.58342H6.58317V4.75008Z"
        fill={color}
      />
    </SvgIcon>
  );
}

export default memo(InformationIcon);
