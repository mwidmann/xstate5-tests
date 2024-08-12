<template>
  <span>
    <button v-if="isPlaying" @click="send('PAUSE')" class="button">
      Pause
    </button>
    <button v-else @click="send('PLAY')" class="button">
      Play
    </button>
  </span>
</template>

<script setup lang="ts">
import { matchesState } from 'xstate';

const props = defineProps<{current: any, send: (event: any) => void}>()
const isPlaying = computed(() => matchesState(props.current, {ready: 'playing'}))
</script>