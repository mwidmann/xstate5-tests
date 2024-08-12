import { assign, createMachine } from "xstate";

export const trafficLightMachine = createMachine(
  {
    types: {
      events: {} as { type: "TIMER" },
    },
    id: "trafficLightMachine",
    initial: "red",
    context: {
      duration: 10000,
    },

    states: {
      red: {
        entry: assign({ duration: () => 10000 }),
        after: {
          DELAY: "yellowFromRed",
        },
      },
      yellowFromRed: {
        entry: assign({ duration: () => 3000 }),
        after: {
          DELAY: "green",
        },
      },
      green: {
        entry: assign({ duration: () => 8000 }),
        after: {
          DELAY: "greenBlinking",
        },
      },
      greenBlinking: {
        entry: assign({ duration: () => 3000 }),
        after: {
          DELAY: "yellowFromGreen",
        },
      },
      yellowFromGreen: {
        entry: assign({ duration: () => 3000 }),
        after: {
          DELAY: "red",
        },
      },
    },
  },
  {
    delays: {
      DELAY: ({ context }) => {
        return context.duration;
      },
    },
  }
);
