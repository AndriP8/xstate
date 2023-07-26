import { Box, Button, Flex } from '@mantine/core';
import { useMachine } from '@xstate/react';

import { colorMachine } from './machine';

function App() {
  const [state, send] = useMachine(colorMachine);
  const color = state.value as string;

  return (
    <Box w="100vw">
      <Flex direction={'column'} justify={'center'} gap={8}>
        <Box w={200} h={50} bg={color} m="auto" />
        <Button m="auto" onClick={() => send('CHANGE')}>
          Change
        </Button>
      </Flex>
    </Box>
  );
}

export default App;
