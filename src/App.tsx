import { useState } from "react";
import {
  Button,
  ChakraProvider,
  Flex,
  Heading,
  Text,
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
  { label: "Measurement", columnChildren: ["To convert", "into"] },
  { label: "Multiplier", columnChildren: ["multiply by"] },
];
const COLUMNS: Array<TColumn<TMockData, keyof TMockData>> = [
  { value: "initial", label: "To convert" },
  { value: "final", label: "into" },
  { value: "multiplier", label: "multiply by", isNumeric: true },
];
function App() {
  const [count, setCount] = useState(0);

  return (
    <ChakraProvider>
      <Flex justifyContent="center">
        <VStack>
          <Heading margin="5">Chakra UI Table</Heading>

          {/* <Button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </Button> */}
          <DataTable
            data={MOCK_DATA}
            columns={COLUMNS}
            parentHeader={PARENT_HEADER}
          />
        </VStack>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
