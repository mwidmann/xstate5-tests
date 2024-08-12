<template>
  <pre>
    currentValue: {{ JSON.stringify(snapshot, null, 2) }}
    currentContext: {{ currentContext }}
    isInPlayableState: {{ isInPlayableState }}
  </pre>

  <div class="container flex mx-auto mt-10 items-stretch">
    <div class="w-1/2">
      <ClientOnly>
        <video
          ref="videoPlayer"
          @canplay="send({ type: 'LOADED', video: videoPlayer })"
          @timeupdate="send({ type: 'TIMING' })"
          @ended="send({ type: 'END' })"
          @error="send({ type: 'FAIL' })"
        >
          <source src="/assets/fox.mp4" type="video/mp4" />
        </video>
      </ClientOnly>
      <div v-if="isInPlayableState">
        <ElapsedBar
          :elapsed="snapshot.context.elapsed"
          :duration="snapshot.context.duration"
        />
        <PlayPauseButton
          :current="snapshot.value"
          :send="(event: string) => send({type: event})"
        />
        <Timer
          :elapsed="snapshot.context.elapsed"
          :duration="snapshot.context.duration"
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
import { useMachine } from "@xstate/vue";
import { matchesState } from "xstate";
import { videoPlayerMachine } from "~/statemachine/VideoPlayer";
import type { HistoryObject } from "~/types/types";

const currentValue = ref();
const currentContext = ref();
const videoPlayer = ref(null);
const history = ref<HistoryObject[]>([]);

const { snapshot, send, actorRef } = useMachine(videoPlayerMachine);

const isInPlayableState = computed(() =>
  ["paused", "playing", "ended"].some((subState) =>
    matchesState(snapshot.value.value, { ready: subState })
  )
);
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
