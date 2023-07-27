import { createMachine } from 'xstate';

export const colorMachine = createMachine(
  {
    id: 'light',
    predictableActionArguments: true,
    initial: 'green',
    context: {
      age: 23,
      zodiac: 'Leo',
    },
    states: {
      green: {
        on: {
          CHANGE: { target: 'yellow' },
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
        exit: ['showAge', 'showZodiac'],
      },
    },
  },
  {
    actions: {
      showAge: (context) => {
        alert(context.age);
      },
      showZodiac: (context) => {
        alert(context.zodiac);
      },
    },
  },
);
