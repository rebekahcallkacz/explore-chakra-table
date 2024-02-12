import { useMemo, useState } from "react";
import {
  ChakraProvider,
  Checkbox,
  Flex,
  Heading,
  Stack,
  VStack,
} from "@chakra-ui/react";

import DataTable, { TColumn, TParentHeaderColumn } from "./DataTable";

type TMockData = {
  initial: string;
  final: string;
  multiplier: number;
};
const MOCK_DATA: Array<TMockData> = [
  { initial: "inches", final: "millimetres (mm)", multiplier: 25.4 },
  { initial: "feet", final: "centimetres (cm)", multiplier: 30.48 },
  { initial: "yards", final: "metres (m)", multiplier: 0.91444 },
];
const PARENT_HEADER: Array<TParentHeaderColumn> = [
  { label: "Measurement", columnChildren: ["initial", "final"] },
  { label: "Multiplier", columnChildren: ["multiplier"], isNumeric: true },
];
const COLUMNS: Array<TColumn<TMockData, keyof TMockData>> = [
  { value: "initial", label: "To convert" },
  { value: "final", label: "into" },
  { value: "multiplier", label: "multiply by", isNumeric: true },
];
function App() {
  const [shownColumns, setShownColumns] = useState({
    initial: true,
    final: true,
    multiplier: true,
  });

  const columnFilters = useMemo(() => {
    const columnFilters: Array<string> = [];
    Object.entries(shownColumns).forEach((column) => {
      if (column[1]) columnFilters.push(column[0]);
    });
    return columnFilters;
  }, [shownColumns]);

  const handleCheckboxChange = (column: "initial" | "final" | "multiplier") => {
    const columnToUpdate = shownColumns[column];
    const newShownColumns = { ...shownColumns };
    newShownColumns[column] = !columnToUpdate;
    setShownColumns(newShownColumns);
  };

  return (
    <ChakraProvider>
      <Flex justifyContent="center">
        <VStack>
          <Heading margin="5">Chakra UI Table</Heading>
          <Stack spacing={[1, 5]} direction={["column", "row"]}>
            <Checkbox
              isChecked={shownColumns.initial}
              onChange={() => handleCheckboxChange("initial")}
            >
              To convert
            </Checkbox>
            <Checkbox
              isChecked={shownColumns.final}
              onChange={() => handleCheckboxChange("final")}
            >
              into
            </Checkbox>
            <Checkbox
              isChecked={shownColumns.multiplier}
              onChange={() => handleCheckboxChange("multiplier")}
            >
              multiply by
            </Checkbox>
          </Stack>
          <DataTable
            data={MOCK_DATA}
            columns={COLUMNS}
            columnFilters={columnFilters}
            parentHeader={PARENT_HEADER}
          />
        </VStack>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
