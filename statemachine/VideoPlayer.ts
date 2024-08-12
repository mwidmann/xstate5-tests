import { setup, createMachine, assign } from "xstate";
export const videoPlayerMachine = setup({
  actions: {
    setVideo: assign({
      video: ({ event }) => event.video,
      duration: ({ event }) => event.video.duration,
    }),
    setElapsed: assign({
      elapsed: ({ context }) => context.video.currentTime || 0,
    }),
    playVideo: ({ context }) => {
      context.video.play();
    },
    pauseVideo: ({ context }) => {
      context.video.pause();
    },
    restartVideo: ({ context }) => {
      context.video.currentTime = 0;
      context.video.play();
    },
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QDcCWEwHsAKAbAhgJ5gBOAsvgMYAWqAdmAHS6b4T1QDEAMgPICCAEQCiggNoAGALqJQAB0yxUAF1SY6skAA9EARgBsuxgGZTxgEwB2XQBYArJYCczgDQhCicxLuM7XywAcdrYBEhI25nYAvlFuaBg4BMTkVLQMzKzsdFwAYvwAktySMkggCkqq6po6CAZGZhbW9k6u7og2xj6RYbqONtZmljFx6Fh4RKQUNPRMJGBshIxy+ACusJCc2Nz8AJrFmuUqahqlNTb9jPoBljZ95o7G1476Nm4eCFbmjDYG+ub6dmMAIcHWGIHiYySk1SM0YcwWSySHE4ABV8mR8gA5ADi+1Kh0qJ1ANTsjiMEgeNzsNnCVwpb08ugkvgCjXMNn0QLsEn0YIhiQmKWm6XhEEWciR2U2-AAqgBlYR4+SKI5VU7tC5XG53B5PF4M2rckymcwBDk2AKm8zmPmjAXJKZpWbzMWIojI4SY8TSA4qwnVRCWYzMv63RyBAGdDoG4y6AKMJwGH5M83W20JcYOmEil2LMB0DAQTbbPY+-F+44BhBBkPs5wRwHU4wG63GRi-fRhAEGSz6Z4xWIgOiYDDwUr8zPQ4VgX0VSvqhAAWn0BsX7PTkMFjthLDYHFnqqJ2na5hbxhsjGczktpl0vZuG-tU6dcNzB-9C6sPijPZCEicNwGpy7b6KBEQWD8PwUjYj6TkKL6iuKqzrBA77zsSiAWG2P76E0oQAa8bQIMGta3GalimnYAR9LBULwbCiFuoQ+7lnOaoYQgnZGL0VgSKEfy6HelgxoJjBeKyuj3L8uhUdEg4TnR245gi+aFmh7HHggASsiYEjiTy-6WICK5EbGbaWHxsZSaBMkBLRW7ZkwABm+CoLgKxzOpR41JEXTWeEEiCdRfQGh0F5hs8ZrsqyVgDlEQA */
  types: {
    events: {} as
      | { type: "LOADED"; video: HTMLVideoElement; duration: number }
      | { type: "FAIL" }
      | { type: "PLAY" }
      | { type: "TIMING"; elapsed: number }
      | { type: "PAUSE" }
      | { type: "END" },
  },
  id: "videoPlayerMachine",
  initial: "loading",
  context: {
    video: null,
    duration: 0,
    elapsed: 0,
  },
  states: {
    loading: {
      on: {
        LOADED: {
          target: "ready",
          actions: ["setVideo"],
        },
        FAIL: "failure",
      },
    },
    ready: {
      initial: "paused",
      states: {
        paused: {
          on: {
            PLAY: {
              target: "playing",
              actions: ["setElapsed", "playVideo"],
            },
          },
        },
        playing: {
          on: {
            TIMING: {
              target: "playing",
              actions: ["setElapsed"],
            },
            PAUSE: {
              target: "paused",
              actions: ["setElapsed", "pauseVideo"],
            },
            END: "ended",
          },
        },
        ended: {
          on: {
            PLAY: {
              target: "playing",
              actions: ["restartVideo"],
            },
          },
        },
      },
    },
    failure: {
      type: "final",
    },
  },
});
