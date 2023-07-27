import { createMachine, raise } from 'xstate';

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
          CHANGE_TO_PINK: { target: 'blue', actions: raise('CHANGE') },
        },
      },
      yellow: {
        on: {
          CHANGE: { target: 'blue', actions: () => alert('yellow') },
        },
      },
      blue: {
        on: {
          CHANGE: {
            target: 'pink',
          },
        },
      },
      pink: {
        on: {
          CHANGE: {
            target: 'green',
          },
        },
        entry: ['showAge', 'showZodiac'],
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
