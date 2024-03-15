import React, { memo } from 'react';
import { IIconProperty } from 'common/type';
import { SvgIcon } from '@material-ui/core';

function EditIcon({ width, height, color }: IIconProperty) {
  return (
    <SvgIcon
      width={width}
      height={height}
      viewBox="0 0 25 24"
      style={{ transform: 'scale(1)', width, height }}
    >
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M3.5 17.2501V21.0001H7.25L18.31 9.94006L14.56 6.19006L3.5 17.2501ZM21.21 7.04006C21.6 6.65006 21.6 6.02006 21.21 5.63006L18.87 3.29006C18.48 2.90006 17.85 2.90006 17.46 3.29006L15.63 5.12006L19.38 8.87006L21.21 7.04006Z"
        fill={color}
      />
    </SvgIcon>
  );
}

export default memo(EditIcon);
