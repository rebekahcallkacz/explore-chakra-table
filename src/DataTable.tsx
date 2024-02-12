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
type TDataTableProps<T, K extends keyof T> = {
  data: Array<T>;
  columns: Array<TColumn<T, K>>;
};
const DataTable = <T, K extends keyof T>({
  data,
  columns,
}: TDataTableProps<T, K>) => {
  console.log(data);
  console.log(columns);
  return (
    <TableContainer width="sm">
      <Table size="sm">
        <Thead>
          {/* <Tr>
            <Th colSpan={2}>Measurements</Th>
            <Th isNumeric>Values</Th>
          </Tr> */}
          <Tr>
            {columns.map((column: TColumn<T, K>) => (
              <Th key={String(column.value)} isNumeric={column.isNumeric}>
                {column.label}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((datum: T) => (
            <Tr>
              {columns.map((column: TColumn<T, K>) => {
                const rowValue = datum[column.value as K] as string | number;
                return <Td isNumeric={column.isNumeric}>{rowValue}</Td>;
              })}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
