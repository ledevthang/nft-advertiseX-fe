import React from 'react';
import {
  ClassKeyOfStyles,
  StyledComponentProps as MUIStyledComponentProps,
} from '@material-ui/styles/withStyles';

export interface ThemeColors {
  pureWhite: React.CSSProperties['color'];
  black1: React.CSSProperties['color'];
  black2: React.CSSProperties['color'];
  black3: React.CSSProperties['color'];
  purple1: React.CSSProperties['color'];
  yellow1: React.CSSProperties['color'];
}

export type StyledComponentProps<StylesOrClassKey> = MUIStyledComponentProps<
  ClassKeyOfStyles<StylesOrClassKey>
>;
