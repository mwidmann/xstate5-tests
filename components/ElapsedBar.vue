<template>
  <div class="elapsed mb-2">
    <div class="elapsed-bar" :style="{ width: `${percentage}%` }"></div>
  </div>
</template>

<script setup lang="ts">
import { calculatePercentage } from '~/utils/utils';
const props = defineProps<{elapsed: number, duration: number}>()

const percentage = computed(() => calculatePercentage(props.duration, props.elapsed))
</script>

<style>
.elapsed {
  width: 100%;
  height: 5px;
}
.elapsed-bar {
  @apply transition-all duration-500 bg-green-500;
  height: 5px;
}
</style>
