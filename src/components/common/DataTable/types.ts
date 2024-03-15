import { DataTableIdEnum } from 'enums/datatables';
import { LabelDisplayedRowsArgs } from '@material-ui/core/TablePagination';
import { SortEnum } from 'enums/sortEnum';
export interface TableRowProps {
  autoExpand?: boolean;
  [key: string]: any;
}

export interface TableExpandRowProps {
  className?: string;
}
export interface DataTableProps<Data = any> {
  columns: Array<DataTableColumn<Data>>;
  data: Array<Data>;
  error?: any;
  loading?: boolean;
  options: DataTableOptions<Data>;
  insertViewIndexs?: Array<number>;
  renderInsertView?: (rowData?: Record<string, any>) => React.ReactNode;
  renderExtraView?: () => React.ReactNode;
  renderContentStatus?: (error: any) => React.ReactNode;
  elevation?: number;
  setContainerTableProps?: () => Record<string, any>;
  tableClassName?: string;
  tableId?: DataTableIdEnum;
  handleSort: (value: SortEnum, column?: any) => void;
}

export interface DataTableColumn<Data = any> {
  label?: string;
  name: string;
  width?: string;
  options?: DataTableColumnOptions<Data>;
}
export interface DataTableColumnOptions<Data = any> {
  customBodyRender?: (
    value: any,
    rowData: Data,
    rowIndex: number,
  ) => string | React.ReactNode;
  customHeaderRender?: () => React.ReactNode;
  hint?: string;
  setCellHeaderProps?: (
    columnMeta: DataTableCustomHeadRenderer,
  ) => Record<string, any>;
  setCellProps?: (
    cellValue: string,
    rowIndex: number,
    columnIndex: number,
    rowData?: Data,
  ) => Record<string, any>;
  sort?: boolean;
  search?: boolean;
  numeric?: boolean;
}

export interface DataTableCustomHeadRenderer extends DataTableColumn {
  index: number;
}

export interface DataTableDownloadOption {
  tooltip?: string;
  processing?: boolean;
  icon?: React.ReactNode;
  onDownload: (state?: {
    searchText: string;
    orderDirection?: SortEnum;
    orderBy?: string;
  }) => void;
}

export interface DataTableOptions<Data = any> {
  stickyHeader?: boolean;
  count?: number;
  elevation?: number;
  noHeader?: boolean;
  onClickTableRow?: (value: Data) => void;
  onChangePage?: (currentPage: number) => void;
  onChangeRowsPerPage?: (numberOfRows: number) => void;
  onColumnSortChange?: (changedColumn: string, direction: SortEnum) => void;
  page: number;
  pagination?: boolean;
  downloadOptions?: DataTableDownloadOption;
  rowExpandIconTooltip?: string;
  renderExpandableRow?: (rowData: Data) => React.ReactNode;
  rowsPerPage: number;
  rowsPerPageOptions: number[];
  setRowProps?: (row: Data) => TableRowProps;
  setExpandRowProps?: (row: Data) => TableExpandRowProps;
  setHeaderProps?: () => Record<string, any>;
  orderBy?: string; // column name
  orderDirection?: SortEnum;
  getDataId?: (data: Data) => string;
  expandableRowsOnClick?: boolean;
  expandableRows?: boolean; // need space on left for arrow icon
  isRowExpandable?: (rowData: Data, dataIndex: number) => boolean; // do not show arrow icon if false
  renderBottomContent?: () => React.ReactNode;
  EmptyDataContent?: React.ReactNode;
  CollapseAllButton?: React.ReactNode;
  onToggleExpand?: (isExpand: boolean, row?: Data) => void;
  setCellHeaderExpandProps?: () => Record<string, any>;
  renderRowTooltip?: (rowData: Data) => string;
  labelDisplayedRows?: (
    paginationInfo: LabelDisplayedRowsArgs,
  ) => React.ReactNode;
}
