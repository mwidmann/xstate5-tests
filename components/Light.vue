<template>
  <div class="rounded-full w-12 h-12" :class="classList"></div>
  <!-- bg-red-500 bg-green-500 bg-yellow-500 -->
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