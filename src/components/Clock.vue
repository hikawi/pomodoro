<script setup lang="ts">
import { $button } from "@/i18n";
import { useStore } from "@nanostores/vue";
import { $pomodoro } from "@s/pomodoro";
import {
  $paused,
  $started,
  $timer,
  $timerText,
  getMaxTime,
  start,
} from "@s/timer";
import { onMounted, onUnmounted, ref, useTemplateRef, watch } from "vue";

const timer = useStore($timer);
const timerText = useStore($timerText);
const pomodoro = useStore($pomodoro);
const started = useStore($started);
const paused = useStore($paused);
const tl = useStore($button);

const mounted = ref(false);
const svgRef = useTemplateRef<HTMLElement>("svg");
const buttonRef = useTemplateRef<HTMLButtonElement>("theButton");

watch(timer, (time) => {
  const maxTime = getMaxTime();
  const value = time > 0 ? time / maxTime : 1;
  svgRef.value?.style.setProperty("--progress", (value * 100).toString());
});

function keyboardHandler(e: KeyboardEvent) {
  switch (e.key) {
    case "p":
    case "P":
      buttonRef.value?.focus();
      buttonRef.value?.click();
      break;
  }
}

onMounted(() => {
  mounted.value = true;
  document.addEventListener("keydown", keyboardHandler);
});

onUnmounted(() => {
  document.removeEventListener("keydown", keyboardHandler);
});

function buttonClick() {
  if (!started.value) {
    start();
  } else {
    $paused.set(!paused.value);
  }
}
</script>

<template>
  <div
    class="clock-outer flex size-[18.75rem] items-center justify-center rounded-full p-4 md:size-[25.625rem] md:p-5"
  >
    <div
      class="relative flex size-full items-center justify-center rounded-full bg-darker-blue p-2 md:p-3"
    >
      <div
        class="relative z-10 flex flex-col items-center justify-center gap-3 text-light-blue"
      >
        <div class="invisible">Hihi</div>
        <span
          class="md:h1 text-[5rem] font-bold"
          :class="{
            'tracking-[-0.25rem] md:tracking-[-0.3125rem]':
              mounted && pomodoro.font === 0,
            'tracking-[-0.625rem]': mounted && pomodoro.font === 2,
          }"
        >
          {{ timerText }}
        </span>

        <button
          class="md:h3 text-[0.875rem] uppercase tracking-[0.8rem]"
          :class="{
            'hover:text-red focus:text-red': mounted && pomodoro.color === 0,
            'hover:text-aqua focus:text-aqua': mounted && pomodoro.color === 1,
            'hover:text-purple focus:text-purple':
              mounted && pomodoro.color === 2,
          }"
          ref="theButton"
          @click="buttonClick"
        >
          {{ !started ? tl.start : paused ? tl.resume : tl.pause }}
        </button>
      </div>

      <div class="absolute inset-2 z-0 md:inset-3">
        <svg
          class="size-full fill-transparent"
          :class="{
            'stroke-red': mounted && pomodoro.color === 0,
            'stroke-aqua': mounted && pomodoro.color === 1,
            'stroke-purple': mounted && pomodoro.color === 2,
          }"
          ref="svg"
        >
          <circle class="progress" cx="50%" cy="50%" r="48%"></circle>
        </svg>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.clock-outer {
  background: linear-gradient(315deg, #2e325a 0%, #0e112a 100%);
  box-shadow:
    -50px -50px 100px 0px #272c5a,
    50px 50px 100px 0px #121530;
}

svg {
  --progress: 100;
  --radius: 50%;
  --circumference: calc(var(--radius) * pi * 2);
  --dash: calc((var(--progress) * var(--circumference)) / 100);
}

.progress {
  stroke-linecap: round;
  stroke-dasharray: var(--dash) calc(var(--circumference) - var(--dash));
  transition: stroke-dasharray linear 0.2s;
  @apply origin-center -rotate-90 stroke-[5px] md:stroke-[10px];
}
</style>
