<template>
  <span class="timer">
    {{ currentTimer }}
  </span>
</template>

<script setup lang="ts">
const props = defineProps<{elapsed: number, duration: number}>()

const currentTimer = computed(() => `${minutes(props.elapsed)}:${seconds(props.elapsed)} of ${minutes(
      props.duration
    )}:${seconds(props.duration)}`)
</script>

<style>
.timer {
  display: inline-block;
  margin-left: 5px;
}
</style>
