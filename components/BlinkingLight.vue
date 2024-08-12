<template>
  <div class="rounded-full w-12 h-12 blinking" :class="classList"></div>
</template>

<script setup lang="ts">
const props = defineProps<{color: 'red'|'yellow'|'green', lit: boolean}>()

const classList = computed(() => {
  const {color, lit} = props
  let classList = `bg-${color}-500`
  if (!lit) {
    classList += ` opacity-25`
  }
  return classList
})
</script>

<style>
.blinking {
  animation-duration: 0.5s;
  animation-name: animate-opacity;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}
@keyframes animate-opacity {
  from {
    opacity: 0.25;
  }
  ,
  to {
    opacity: 1;
  }
}</style>