import React, { memo } from 'react';
import { IIconProperty } from 'common/type';
import { SvgIcon } from '@material-ui/core';

function OpenInNew({ width, height, color }: IIconProperty) {
  return (
    <SvgIcon
      width={width}
      height={height}
      viewBox="0 0 14 14"
      style={{ transform: 'scale(1)', width, height }}
    >
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M11.0833 11.5833H11.5222C11.4046 11.6869 11.2507 11.75 11.0833 11.75H2.91667C2.74708 11.75 2.5928 11.687 2.47548 11.5833H2.91667H11.0833ZM11.75 11.0833C11.75 11.2507 11.6869 11.4046 11.5833 11.5222V11.0833V7.5H11.75V11.0833ZM2.91667 2.25H6.5V2.41667H2.91667H2.47548C2.5928 2.31301 2.74708 2.25 2.91667 2.25ZM2.25 2.91667C2.25 2.74778 2.31283 2.59321 2.41667 2.47552V2.91667V11.0833V11.5245C2.31283 11.4068 2.25 11.2522 2.25 11.0833V2.91667ZM11.5833 5.33333V3.73917V2.53206L10.7298 3.38561L5.34917 8.76623L5.23377 8.65083L10.6144 3.27022L11.4679 2.41667H10.2608H8.66667V2.25H11.75V5.33333H11.5833Z"
        fill={color}
        stroke={color}
      />
    </SvgIcon>
  );
}

export default memo(OpenInNew);
