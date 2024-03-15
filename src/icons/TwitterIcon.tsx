import React, { memo } from 'react';
import { IIconProperty } from 'common/type';
import { SvgIcon } from '@material-ui/core';

function TwitterIcon({ width, height, color }: IIconProperty) {
  return (
    <SvgIcon
      width={width}
      height={height}
      viewBox="0 0 16 16"
      style={{ transform: 'scale(1)', width, height }}
    >
      <path
        d="M15.9687 2.549C15.3697 2.81274 14.7351 2.98683 14.0853 3.06567C14.7694 2.6545 15.2816 2.0097 15.5273 1.25034C14.8933 1.62034 14.1907 1.88967 13.4427 2.03967C12.9492 1.51196 12.2952 1.16195 11.5824 1.044C10.8696 0.926058 10.1378 1.04677 9.50062 1.3874C8.86345 1.72802 8.35657 2.2695 8.0587 2.92775C7.76083 3.586 7.68864 4.32418 7.85333 5.02767C5.12667 4.899 2.71133 3.589 1.09333 1.61034C0.799196 2.11021 0.645776 2.68035 0.649333 3.26034C0.649333 4.40034 1.22933 5.40234 2.108 5.991C1.58724 5.97443 1.07798 5.83363 0.622667 5.58034V5.62034C0.622371 6.37793 0.884179 7.1123 1.36367 7.69884C1.84316 8.28539 2.51081 8.68799 3.25333 8.83834C2.7722 8.96726 2.26828 8.98662 1.77867 8.895C1.98941 9.54701 2.39844 10.117 2.94868 10.5253C3.49891 10.9337 4.1629 11.1601 4.848 11.173C3.68769 12.0836 2.25498 12.5779 0.78 12.5763C0.52 12.5763 0.260667 12.561 0 12.5317C1.50381 13.4946 3.25234 14.0057 5.038 14.0043C11.0733 14.0043 14.37 9.007 14.37 4.681C14.37 4.541 14.37 4.401 14.36 4.261C15.004 3.79758 15.5595 3.22222 16 2.56234L15.9687 2.549Z"
        fill={color}
      />
    </SvgIcon>
  );
}

export default memo(TwitterIcon);