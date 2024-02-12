import { useState } from "react";
import {
  Button,
  ChakraProvider,
  Flex,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";

import DataTable from "./DataTable";

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
          <DataTable />
        </VStack>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
