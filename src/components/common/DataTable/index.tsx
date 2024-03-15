import React, { useState, useCallback, useEffect, useMemo } from 'react';
import clsx from 'clsx';
import {
  TablePagination,
  Typography,
  Table,
  TableBody,
  TableContainer,
  Paper,
} from '@material-ui/core';
import MTableRow from '@material-ui/core/TableRow';
import MTableCell from '@material-ui/core/TableCell';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import { DataTableProps, DataTableOptions } from './types';
import usePrevious from 'hooks/usePrevious';
import { compareObject } from 'utils/compare';
import { useStyles } from './styles';
// import CircularLoader, { CircularLoaderTypeEnum } from '../CircularLoader';

const defaultOptions: Pick<
  DataTableOptions,
  'page' | 'rowsPerPage' | 'pagination'
> = {
  page: 0,
  rowsPerPage: 10,
  pagination: true,
};

export default function DataTable(props: DataTableProps) {
  const classes = useStyles();
  const {
    data,
    columns,
    options,
    elevation = 0,
    renderExtraView,
    setContainerTableProps,
    renderContentStatus,
    error,
    loading = false,
    tableClassName,
    insertViewIndexs,
    tableId,
    renderInsertView,
    handleSort,
  } = props;
  const {
    page,
    rowsPerPage,
    pagination,
    count,
    EmptyDataContent,
    expandableRowsOnClick,
    expandableRows,
    rowExpandIconTooltip,
    onChangePage,
    onChangeRowsPerPage,
    onColumnSortChange,
    getDataId,
    renderExpandableRow,
    isRowExpandable,
    setRowProps,
    setExpandRowProps,
    setHeaderProps,
    setCellHeaderExpandProps,
    renderBottomContent,
    stickyHeader,
    CollapseAllButton,
    onToggleExpand,
    onClickTableRow,
    noHeader,
    renderRowTooltip,
  } = { ...defaultOptions, ...options };

  // Own states
  const [curPage, setCurPage] = useState(page);
  const [pageSize, setPageSize] = useState(rowsPerPage);
  const [orderBy, setOrderBy] = useState(options.orderBy);
  const [orderDirection, setOrderDirection] = useState(options.orderDirection);

  // Handlers
  const handleChangePage = useCallback(
    (_: any, newPage: number) => {
      if (onChangePage) {
        onChangePage(newPage);
      } else {
        setCurPage(newPage);
      }
    },
    [onChangePage],
  );

  const handleChangeRowsPerPage = useCallback(
    (event: any) => {
      const size = parseInt(event.target.value, 10);
      if (onChangeRowsPerPage) {
        onChangeRowsPerPage(size);
      } else {
        setPageSize(size);
      }
      // Force reset to first page since data was changed
      setCurPage(0);
    },
    [onChangeRowsPerPage],
  );

  // Calculate display data from current state
  const [displayData, displayCount] = useMemo(() => {
    let newData = [...data];
    let dataCount = count || 0;
    // Self sort data if needed
    if (!onColumnSortChange && orderBy && orderDirection) {
      newData = data
        .slice()
        .sort((row1, row2) =>
          compareObject(row1, row2, orderDirection, orderBy),
        );
    }

    // Self pagination
    if (pagination && !onChangePage)
      newData = newData.slice(curPage * pageSize, (curPage + 1) * pageSize);
    // Insert row
    if (insertViewIndexs !== undefined) {
      insertViewIndexs.forEach((val) => {
        newData.splice(val, 0, {
          isInsertView: true,
        });
      });
    }
    return [newData, dataCount];
  }, [
    data,
    curPage,
    pageSize,
    orderDirection,
    orderBy,
    pagination,
    count,
    insertViewIndexs,
    onColumnSortChange,
    onChangePage,
  ]);

  // Update state when props changed
  useEffect(() => {
    if (options.onChangePage) {
      setCurPage(options.page);
    }

    if (options.onColumnSortChange) {
      setOrderBy(options.orderBy);
      setOrderDirection(options.orderDirection);
    }

    if (options.onChangeRowsPerPage) {
      setPageSize(options.rowsPerPage);
    }
  }, [options]);

  const lastData = usePrevious(data);
  useEffect(() => {
    if (data !== lastData && !options.onChangePage) {
      // Reset page number if data changed and self page manage
      setCurPage(0);
    }
  }, [data, lastData, options]);

  const { className, ...otherProps } = setContainerTableProps
    ? setContainerTableProps()
    : { className: '' };

  const Content = useMemo(() => {
    const numberColumns = (columns?.length || 0) + (expandableRows ? 1 : 0);
    if (!displayData.length) {
      if (loading) return null; // loading status
      const isError = !loading && error;
      const isEmpty = !loading && !error && !data.length;
      const emptyElement = React.isValidElement(EmptyDataContent) ? (
        EmptyDataContent
      ) : (
        <Typography className={classes.noDataMessage} variant="h6">
          {EmptyDataContent || 'No data available'}
        </Typography>
      );

      return (
        <MTableRow>
          <MTableCell colSpan={numberColumns} className={classes.cursorDefault}>
            {isEmpty && emptyElement}
            {isError && renderContentStatus && renderContentStatus(error)}
          </MTableCell>
        </MTableRow>
      );
    }

    const rows = displayData.map((row, i) => {
      if (row?.isInsertView === true && renderInsertView) {
        return (
          <MTableRow className={classes.insertedRow} key={i.toString()}>
            <MTableCell
              colSpan={numberColumns}
              className={classes.cursorDefault}
            >
              {renderInsertView(row)}
            </MTableCell>
          </MTableRow>
        );
      }

      return (
        <TableRow
          key={getDataId ? getDataId(row) : i.toString()}
          columns={columns}
          rowData={row}
          rowIndex={i}
          isExpandable={
            isRowExpandable ? isRowExpandable(row, i) : expandableRows
          }
          expandableRowsOnClick={expandableRowsOnClick}
          rowExpandIconTooltip={rowExpandIconTooltip}
          renderExpandableRow={renderExpandableRow}
          setRowProps={setRowProps}
          setExpandRowProps={setExpandRowProps}
          onToggleExpand={onToggleExpand}
          onClickTableRow={onClickTableRow}
          renderRowTooltip={renderRowTooltip}
        />
      );
    });

    return (
      <>
        {rows}
        {renderBottomContent && (
          <MTableRow key="load-more-row" className={classes.cursorDefault}>
            <MTableCell colSpan={numberColumns}>
              {renderBottomContent()}
            </MTableCell>
          </MTableRow>
        )}
      </>
    );
  }, [
    displayData,
    columns,
    expandableRows,
    expandableRowsOnClick,
    rowExpandIconTooltip,
    renderInsertView,
    isRowExpandable,
    getDataId,
    renderExpandableRow,
    setRowProps,
    setExpandRowProps,
    error,
    renderContentStatus,
    renderBottomContent,
    EmptyDataContent,
    classes,
    data.length,
    loading,
    onToggleExpand,
    onClickTableRow,
    renderRowTooltip,
  ]);

  const shouldRenderPagination =
    !(!loading && !error && !data.length) && pagination;

  return (
    <Paper elevation={elevation} className={classes.root}>
      {renderExtraView && renderExtraView()}
      <TableContainer className={clsx(className)} {...otherProps}>
        <Table
          stickyHeader={stickyHeader}
          className={clsx(tableClassName)}
          id={tableId}
        >
          {!noHeader && (
            <TableHeader
              columns={columns}
              order={options.orderDirection}
              orderBy={options.orderBy}
              expandableRows={!!renderExpandableRow}
              setHeaderProps={setHeaderProps}
              setCellHeaderExpandProps={setCellHeaderExpandProps}
              CollapseAllButton={CollapseAllButton}
              handleSort={handleSort}
            />
          )}

          <TableBody>
            {/* <CircularLoader
              loading={loading}
              type={CircularLoaderTypeEnum.FULL_LAYOUT}
            /> */}
            {Content}
          </TableBody>
        </Table>
      </TableContainer>
      {shouldRenderPagination && (
        <TablePagination
          className={classes.pagination}
          rowsPerPageOptions={options.rowsPerPageOptions}
          component="div"
          count={displayCount}
          rowsPerPage={pageSize}
          page={curPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Paper>
  );
}
