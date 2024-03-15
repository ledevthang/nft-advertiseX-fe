import React, { useMemo } from 'react';
import clsx from 'clsx';
import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@material-ui/core/';
import { DataTableColumn } from '../types';
import { StyledComponentProps } from 'types/style';
import { SortEnum } from 'enums/sortEnum';
import { styles, useStyles } from './styles';
import { ReactComponent as IconSortDown } from 'assets/icon-sort-down.svg';
import { ReactComponent as IconSortUp } from 'assets/icon-sort-up.svg';
export interface TablelHeaderProps extends StyledComponentProps<typeof styles> {
  columns: Array<DataTableColumn>;
  orderBy?: string;
  order?: SortEnum;
  expandableRows?: boolean;
  setHeaderProps?: () => Record<string, any>;
  setCellHeaderExpandProps?: () => Record<string, any>;
  CollapseAllButton?: React.ReactNode;
  hidden?: boolean;
  handleSort: (value: SortEnum, column?: any) => void;
}

export default function TableHeader(props: TablelHeaderProps) {
  const classes = useStyles(props);
  const {
    hidden,
    order,
    orderBy,
    expandableRows,
    setHeaderProps,
    columns,
    CollapseAllButton,
    setCellHeaderExpandProps,
    handleSort,
  } = props;
  const sortDirection =
    order === SortEnum.Asc
      ? 'asc'
      : order === SortEnum.Desc
      ? 'desc'
      : undefined;

  const renderName = useMemo(
    () => (value?: string) => {
      if (value === 'FirstPlace') {
        return 'firstPlace';
      } else if (value === 'LastPlace') {
        return 'lastPlace';
      } else if (value === 'Owners') {
        return 'totalOwner';
      } else if (value === 'VolumeAll') {
        return 'allTimeVolume';
      } else if (value === 'Volume24h') {
        return '_24hVolume';
      } else if (value === 'Vol7d') {
        return '_7dVolume';
      } else if (value === 'Vol30d') {
        return '_30dVolume';
      }
    },
    [],
  );

  const cells = useMemo(() => {
    return columns.map((headCell, index) => {
      const cellHeaderProps = headCell.options?.setCellHeaderProps
        ? headCell.options?.setCellHeaderProps({
            index,
            ...headCell,
          }) || {}
        : {};

      const { className, ...otherCellHeaderProps } = cellHeaderProps;

      return (
        <TableCell
          className={clsx(classes.noSelect, className, classes.header)}
          key={`${headCell.name}-${index.toString()}`}
          align={headCell.options?.numeric ? 'right' : 'left'}
          sortDirection={orderBy === headCell.name ? sortDirection : false}
          style={headCell.width ? { width: headCell.width } : undefined}
          {...otherCellHeaderProps}
        >
          <TableSortLabel
            className={`${classes.title} ${
              headCell.options?.sort
                ? ''
                : clsx(classes.noSelect, classes.noHover)
            }`}
            hideSortIcon={true}
          >
            {headCell.options?.customHeaderRender
              ? headCell.options?.customHeaderRender()
              : headCell.label}
          </TableSortLabel>
          {!headCell.options?.customHeaderRender && headCell.label ? (
            <div className={classes.wrapIconSort}>
              <IconSortUp
                onClick={() => handleSort(SortEnum.Asc, headCell.label)}
                className={clsx({
                  [classes.defaultIcon]: order !== SortEnum.Desc,
                  [classes.clickIcon]:
                    order === SortEnum.Desc &&
                    renderName(orderBy) === headCell.name,
                })}
              />
              <IconSortDown
                onClick={() => handleSort(SortEnum.Desc, headCell.label)}
                className={clsx({
                  [classes.defaultIcon]: order !== SortEnum.Asc,
                  [classes.clickIcon]:
                    order === SortEnum.Asc &&
                    renderName(orderBy) === headCell.name,
                })}
              />
            </div>
          ) : (
            <></>
          )}
        </TableCell>
      );
    });
  }, [columns, sortDirection, orderBy, classes, order, handleSort, renderName]);

  const { className, ...otherProps } = setHeaderProps
    ? setHeaderProps()
    : { className: '' };

  const expandCell = useMemo(() => {
    const { className: classNameHeaderExpand } = setCellHeaderExpandProps
      ? setCellHeaderExpandProps()
      : { className: '' };
    return expandableRows ? (
      <TableCell
        className={clsx(
          classes.noSelect,
          classes.buttonExpand,
          classNameHeaderExpand,
        )}
      >
        {CollapseAllButton}
      </TableCell>
    ) : undefined;
  }, [CollapseAllButton, classes, expandableRows, setCellHeaderExpandProps]);
  return (
    <TableHead
      className={clsx(className, { [classes.hidden]: hidden })}
      {...otherProps}
    >
      <TableRow>
        {expandCell}
        {cells}
      </TableRow>
    </TableHead>
  );
}
