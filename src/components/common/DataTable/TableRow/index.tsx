import React, { useState, useCallback, useMemo } from 'react';
import clsx from 'clsx';
import { Tooltip, TableCell, TableRow } from '@material-ui/core';
import { DataTableColumn, TableExpandRowProps, TableRowProps } from '../types';
import { useStyles } from './styles';

interface DataTablelRowProps {
  columns: Array<DataTableColumn>;
  rowData: Record<string, any>;
  expandableRowsOnClick?: boolean;
  rowIndex: number;
  isExpandable?: boolean;
  rowExpandIconTooltip?: string;
  renderExpandableRow?: (rowData: Record<string, any>) => React.ReactNode;
  setRowProps?: (row: Record<string, any>) => TableRowProps;
  setExpandRowProps?: (row: Record<string, any>) => TableExpandRowProps;
  onToggleExpand?: (isExpand: boolean, row: Record<string, any>) => void;
  onClickTableRow?: (value: any) => void;
  renderRowTooltip?: (rowData: Record<string, any>) => string;
}

export default function DataTableRow({
  columns,
  rowData,
  isExpandable,
  expandableRowsOnClick,
  renderExpandableRow,
  setRowProps,
  onToggleExpand,
  onClickTableRow,
  rowIndex,
  renderRowTooltip,
}: DataTablelRowProps) {
  const classes = useStyles();
  const { autoExpand, className, ...otherCellHeaderProps } = setRowProps
    ? setRowProps(rowData)
    : ({ className: '' } as TableRowProps);

  const [open, setOpen] = useState(!!autoExpand);

  const toggleExpand = useCallback(
    (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      e.stopPropagation();
      setOpen(!open);
      if (onToggleExpand) {
        onToggleExpand(!open, rowData);
      }
    },
    [setOpen, onToggleExpand, open, rowData],
  );

  const shouldExpandOnSelect = expandableRowsOnClick && isExpandable;
  const shouldRenderExpand = open && isExpandable;
  const handleClickRow = useCallback(
    (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      e.stopPropagation();
      if (onClickTableRow) onClickTableRow(rowData);
    },
    [onClickTableRow, rowData],
  );

  const mainContents = useMemo(() => {
    return columns.map((col, index) => {
      const cellProps =
        col.options?.setCellProps?.(
          rowData[col.name],
          rowIndex,
          index,
          rowData,
        ) ?? {};

      const { cellClassName, ...otherCellProps } = cellProps;

      return (
        <TableCell
          key={`${col.name}-${index.toString()}`}
          component="th"
          scope="row"
          className={clsx(
            shouldRenderExpand ? classes.isExpand : '',
            cellClassName,
          )}
          onClick={handleClickRow}
          style={col.width ? { width: col.width } : undefined}
          {...otherCellProps}
        >
          {col.options?.customBodyRender
            ? col.options?.customBodyRender(
                rowData[col.name],
                rowData,
                rowIndex,
              )
            : rowData[col.name]}
        </TableCell>
      );
    });
  }, [classes, columns, rowData, shouldRenderExpand, rowIndex, handleClickRow]);

  const expandContent = useMemo(
    () =>
      shouldRenderExpand &&
      renderExpandableRow && (
        <TableCell colSpan={columns.length + 1}>
          {renderExpandableRow(rowData)}
        </TableCell>
      ),
    [shouldRenderExpand, columns, rowData, renderExpandableRow],
  );

  const rowClassName = useMemo(
    () =>
      clsx(
        classes.root,
        className,
        shouldExpandOnSelect || onClickTableRow ? '' : classes.noSelect,
      ),
    [classes, className, shouldExpandOnSelect, onClickTableRow],
  );

  return (
    <>
      <Tooltip title={renderRowTooltip?.(rowData) || ''}>
        <TableRow
          onClick={shouldExpandOnSelect ? toggleExpand : undefined}
          className={rowClassName}
          {...otherCellHeaderProps}
          data-id={rowData?.id}
        >
          {mainContents}
        </TableRow>
      </Tooltip>
      {expandContent && (
        <TableRow className={classes.expandRow}>{expandContent}</TableRow>
      )}
    </>
  );
}
