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
}: TDataTableProps<T, K>) => {
  console.log(data);
  console.log(columns);
  return (
    <TableContainer width="sm">
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>To convert</Th>
            <Th>into</Th>
            <Th isNumeric>multiply by</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>inches</Td>
            <Td>millimetres (mm)</Td>
            <Td isNumeric>25.4</Td>
          </Tr>
          <Tr>
            <Td>feet</Td>
            <Td>centimetres (cm)</Td>
            <Td isNumeric>30.48</Td>
          </Tr>
          <Tr>
            <Td>yards</Td>
            <Td>metres (m)</Td>
            <Td isNumeric>0.91444</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
