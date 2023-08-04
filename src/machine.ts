import { assign, createMachine, raise } from 'xstate';

type Todo = {
  completed: boolean;
  id: number;
  title: string;
  userId: number;
};

type Context = {
  age: number;
  zodiac: string;
  todo: null | Todo;
  todoError: string;
  counter: number;
};

type Event =
  | { type: 'CHANGE' }
  | { type: 'CHANGE_TO_PINK' }
  | { type: 'FETCH' }
  | { type: 'INC' };

const fetchTodo = () =>
  fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then((res) => res.json())
    .then((res) => res);

export const colorMachine = createMachine(
  {
    id: 'light',
    schema: {
      context: {} as Context,
      events: {} as Event,
    },
    predictableActionArguments: true,
    initial: 'green',
    context: {
      age: 23,
      zodiac: 'Leo',
      todo: null,
      todoError: '',
      counter: 0,
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
          CHANGE: {
            target: 'blue',
            // note: action this below doesn't work when invoke function
            // actions: () => alert('yellow'),
          },
          FETCH: {},
        },
        invoke: {
          id: 'getTodo',
          src: () => fetchTodo(),
          onDone: {
            target: 'blue',
            actions: [
              assign({
                todo: (_context, event) => event.data,
              }),
              () => alert('yellow'),
            ],
          },
          onError: {
            target: 'red',
            actions: assign({ todoError: (_, event) => event.data.message }),
          },
        },
      },
      blue: {
        invoke: {
          id: 'incInterval',
          src: () => (callback) => {
            const id = setInterval(() => callback('INC'), 1000);
            return () => clearInterval(id);
          },
        },
        on: {
          CHANGE: {
            target: 'pink',
          },
          INC: {
            actions: assign({ counter: (context) => context.counter + 1 }),
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
      red: {
        type: 'final',
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
