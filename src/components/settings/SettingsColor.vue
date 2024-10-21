<script setup lang="ts">
import { $settings } from "@/i18n";
import IconCheck from "@c/icons/IconCheck.vue";
import { useStore } from "@nanostores/vue";
import { $pomodoro } from "@s/pomodoro";
import { computed } from "vue";

const tl = useStore($settings);
const pomodoro = useStore($pomodoro);
const options = computed(() => [tl.value.red, tl.value.cyan, tl.value.purple]);
</script>

<template>
  <div
    class="flex flex-col gap-4 py-6 text-center md:flex-row md:items-center md:justify-between"
  >
    <h3
      class="md:h4 text-center text-[0.6875rem] font-bold uppercase tracking-[0.26444rem] md:text-left"
    >
      {{ tl.color }}
    </h3>

    <div class="flex items-center justify-center gap-4" role="radiogroup">
      <button
        :aria-label="opt"
        :aria-checked="idx === pomodoro.color"
        role="radio"
        v-for="(opt, idx) in options"
        @click="$pomodoro.setKey('color', idx)"
        class="flex size-10 items-center justify-center rounded-full ring-offset-4 hover:ring-1 hover:ring-light-blue focus:ring-1 focus:ring-light-blue"
        :class="{
          'bg-red': idx === 0,
          'bg-aqua': idx === 1,
          'bg-purple': idx === 2,
        }"
      >
        <!-- Translate y-px is just to make it "more center", because computer's center is not human eye's center. -->
        <IconCheck
          v-if="idx === pomodoro.color"
          class="size-5 translate-y-px"
        />
      </button>
    </div>
  </div>
</template>
