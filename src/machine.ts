import { createMachine } from 'xstate';

export const colorMachine = createMachine({
  id: 'light',
  initial: 'green',
  states: {
    green: {
      on: {
        CHANGE: 'yellow',
      },
    },
    yellow: {
      on: {
        CHANGE: 'blue',
      },
    },
    blue: {
      on: {
        CHANGE: 'green',
      },
    },
  },
});
