<template>
  <div>
    <p>current value: {{ currentValue }}</p>
    <div
      class="border rounded border-black w-16 h-48 flex flex-col items-center justify-between p-4"
    >
      <Light color="red" :lit="currentValue === 'red'"></Light>
      <Light
        color="yellow"
        :lit="
          currentValue === 'yellowFromRed' || currentValue === 'yellowFromGreen'
        "
      ></Light>
      <BlinkingLight
        color="green"
        :lit="true"
        v-if="currentValue === 'greenBlinking'"
      ></BlinkingLight>
      <Light color="green" :lit="currentValue === 'green'" v-else></Light>
    </div>
  </div>
</template>

<script setup lang="ts">
import { createActor } from "xstate";
import { trafficLightMachine } from "../statemachine/TrafficLights";

const currentValue = ref();

// watch(currentValue, () => {
//   console.log(actor, currentValue);
//   setTimeout(() => {
//     actor.send({ type: "TIMER" });
//   }, actor.getSnapshot().context.duration);
// });

const actor = createActor(trafficLightMachine);
actor.subscribe((snapshot) => {
  currentValue.value = snapshot.value;
});
actor.start();
</script>

<style></style>
