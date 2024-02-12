import { useMemo } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";

export type TColumn<T, K extends keyof T> = {
  value: K | string;
  label: string;
  isNumeric?: boolean;
};
export type TParentHeaderColumn = {
  label: string;
  columnChildren: Array<string>;
  isNumeric?: boolean;
};
type TDataTableProps<T, K extends keyof T> = {
  data: Array<T>;
  columns: Array<TColumn<T, K>>;
  columnFilters?: Array<K | string>;
  parentHeader?: Array<TParentHeaderColumn>;
};
const DataTable = <T, K extends keyof T>({
  data,
  columns,
  columnFilters,
  parentHeader,
}: TDataTableProps<T, K>) => {
  const filteredColumns = useMemo(() => {
    return columns.filter((column) =>
      columnFilters ? columnFilters.includes(column.value as K) : true
    );
  }, [columns, columnFilters]);

  const filteredParentHeader = useMemo(() => {
    if (!parentHeader) return parentHeader;
    const filteredParentHeader: Array<TParentHeaderColumn> = [];
    parentHeader.forEach((column) => {
      const filteredColumnChildren = column.columnChildren.filter(
        (columnValue) => columnFilters?.includes(columnValue)
      );
      if (filteredColumnChildren.length) {
        filteredParentHeader.push({
          label: column.label,
          columnChildren: filteredColumnChildren,
          isNumeric: column.isNumeric,
        });
      }
    });
    return filteredParentHeader;
  }, [parentHeader, columnFilters]);

  return (
    <TableContainer width="sm">
      <Table size="sm">
        <Thead>
          {filteredParentHeader && (
            <Tr>
              {filteredParentHeader.map((column) => (
                <Th
                  key={column.label}
                  colSpan={column.columnChildren.length}
                  isNumeric={column.isNumeric}
                >
                  {column.label}
                </Th>
              ))}
            </Tr>
          )}
          <Tr>
            {filteredColumns.map((column: TColumn<T, K>) => (
              <Th key={String(column.value)} isNumeric={column.isNumeric}>
                {column.label}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((datum: T) => (
            <Tr key={Math.random()}>
              {filteredColumns.map((column: TColumn<T, K>) => {
                const rowValue = datum[column.value as K] as string | number;
                return (
                  <Td key={rowValue} isNumeric={column.isNumeric}>
                    {rowValue}
                  </Td>
                );
              })}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
