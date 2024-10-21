<script setup lang="ts">
import { $settings } from "@/i18n";
import { useStore } from "@nanostores/vue";
import { $pomodoro } from "@s/pomodoro";
import { computed } from "vue";

const tl = useStore($settings);
const pomodoro = useStore($pomodoro);
const options = computed(() => [tl.value.sans, tl.value.serif, tl.value.mono]);
</script>

<template>
  <div
    class="flex flex-col gap-4 py-6 text-center md:flex-row md:items-center md:justify-between"
  >
    <h3
      class="md:h4 text-center text-[0.6875rem] font-bold uppercase tracking-[0.26444rem] md:text-left"
    >
      {{ tl.font }}
    </h3>

    <div class="flex items-center justify-center gap-4" role="radiogroup">
      <button
        :aria-label="opt"
        :aria-checked="idx === pomodoro.font"
        role="radio"
        v-for="(opt, idx) in options"
        @click="$pomodoro.setKey('font', idx)"
        class="flex size-10 items-center justify-center rounded-full ring-offset-4 hover:ring-1 hover:ring-light-blue focus:ring-1 focus:ring-light-blue"
        :class="{
          'bg-darker-blue text-white': idx === pomodoro.font,
          'bg-almost-white text-dark-blue text-opacity-75':
            idx !== pomodoro.font,
          'font-kumbh-sans': idx === 0,
          'font-roboto-slab': idx === 1,
          'font-space-mono': idx === 2,
        }"
      >
        Aa
      </button>
    </div>
  </div>
</template>
