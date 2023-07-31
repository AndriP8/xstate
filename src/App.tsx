import { Box, Button, Flex, Text } from '@mantine/core';
import { useMachine } from '@xstate/react';

import { colorMachine } from './machine';

function App() {
  const [state, send] = useMachine(colorMachine, {
    context: {
      age: 22,
      zodiac: 'Pisces',
    },
  });
  const color = state.value as string;

  return (
    <Box w="100vw">
      <Flex direction={'column'} justify={'center'} align={'center'} gap={8}>
        {state.context.todo ? <Text>{state.context.todo.title}</Text> : null}
        {state.value === 'red' ? <Text>{state.context.todoError}</Text> : null}
        <Box w={200} h={50} bg={color} m="auto" />
        <Button m="auto" onClick={() => send('CHANGE')}>
          Change
        </Button>
        <Button m="auto" onClick={() => send('CHANGE_TO_PINK')}>
          Change Blue from Green
        </Button>
      </Flex>
    </Box>
  );
}

export default App;
