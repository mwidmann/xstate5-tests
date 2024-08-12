<template>
  <ul>
    <li
      v-for="(h, i) in history"
      :key="i"
      class="flex justify-between w-full items-start mb-2 pb-2 border-b border-black-200"
    >
      <div>
        <div>
          <span
            class="text-xs font-bold text-white px-2 bg-blue-500 rounded py-1"
          >
            {{ h.event }}
          </span>

          <span
            class="text-xs font-bold text-white px-2 bg-red-500 rounded py-1 mx-2"
            >{{ h.from }}</span
          >
          <span
            class="text-xs font-bold text-white px-2 bg-green-500 rounded py-1"
            >{{ getTarget(h.target) }}</span
          >
        </div>
        <div class="text-xs text-black-200 pl-10">{{ h.context }}</div>
      </div>
      <span class="text-xs bg-gray-500 text-white mt-2 px-2 rounded-full">{{
        h.count
      }}</span>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { HistoryObject } from '~/types/types';

const props = defineProps<{ history: HistoryObject[] }>();

const getTarget = (target: string | { [key: string]: string }): string => {
  if (typeof target === "string") {
    return target;
  }
  let rs = "";
  for (const k in target) {
    rs += `${k}.${target[k]}`;
  }
  return rs;
};
</script>
