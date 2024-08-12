<template>
  <pre>
    currentValue: {{ JSON.stringify(currentValue, null, 2) }}
    currentContext: {{ currentContext }}
    isInPlayableState: {{isInPlayableState}}
  </pre>

  <div class="container flex mx-auto mt-10 items-stretch">
    <div class="w-1/2">
      <ClientOnly>
        <video
          ref="videoPlayer"
          @canplay="send('LOADED', { video: videoPlayer })"
          @timeupdate="send('TIMING')"
          @ended="send('END')"
          @error="send('FAIL')"
        >
          <source src="/assets/fox.mp4" type="video/mp4" />
        </video>
      </ClientOnly>
      <div v-if="isInPlayableState">
        <ElapsedBar
          :elapsed="currentContext.elapsed"
          :duration="currentContext.duration"
        />
        <PlayPauseButton :current="currentValue" :send="send" />
        <Timer
          :elapsed="currentContext.elapsed"
          :duration="currentContext.duration"
        />
      </div>
    </div>

    <History
      :history="history.slice(-5).reverse()"
      class="w-1/2 p-10"
    ></History>
  </div>
</template>

<script setup lang="ts">
import { createActor, matchesState } from "xstate";
import { videoPlayerMachine } from "~/statemachine/VideoPlayer";
import type { HistoryObject } from "~/types/types";

const currentValue = ref();
const currentContext = ref();
const videoPlayer = ref(null);
const history = ref<HistoryObject[]>([]);

const isInPlayableState = computed(() => {
  console.log(
    `currentValue.value`,
    currentValue.value,
    typeof currentValue.value
  );

  if (typeof currentValue.value !== "object") return false;
  return ["paused", "playing", "ended"].some((subState) =>
    matchesState(currentValue.value, {ready: subState})
  )
});

const videoActor = createActor(videoPlayerMachine);
videoActor.subscribe((snapshot) => {
  currentContext.value = snapshot.context;
  currentValue.value = snapshot.value;
});
videoActor.start();

const send = (event: string, p: any = {}) => {
  console.log(`GOT Event`, event, p);
  videoActor?.send({ type: event, ...p });
};
</script>

<style>
.opacity-on {
  animation: animate-opacity 0.2s ease-in;
}

@keyframes animate-opacity {
  0% {
    opacity: 0.25;
  }
  100% {
    opacity: 1;
  }
}
</style>
