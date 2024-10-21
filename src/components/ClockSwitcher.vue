<script setup lang="ts">
import { $clockSwitcher } from "@/i18n/";
import { useStore } from "@nanostores/vue";
import { $clockType } from "@s/clock-type.ts";
import { computed } from "vue";

const clockType = useStore($clockType);
const clockSwitcher = useStore($clockSwitcher);

const sliderClass = computed(() => {
  return ["translate-x-0", "translate-x-full", "translate-x-[200%]"][
    clockType.value
  ];
});
const items = computed(() => [
  clockSwitcher.value.pomodoro,
  clockSwitcher.value.shortBreak,
  clockSwitcher.value.longBreak,
]);
</script>

<template>
  <div
    class="body1 relative grid w-full grid-cols-3 place-content-center rounded-full bg-darker-blue px-1.5 py-2 text-center text-dark-blue"
    role="radiogroup"
    :aria-label="clockSwitcher.radioGroup"
  >
    <div class="absolute inset-x-1.5 inset-y-2 z-0 rounded-full">
      <div
        data-testid="slider"
        class="absolute inset-0 w-1/3 rounded-full bg-red duration-200"
        :class="sliderClass"
      ></div>
    </div>

    <label
      class="relative z-[1] flex h-12 items-center justify-center rounded-full"
      :class="{
        'text-dark-blue focus-within:animate-pulse': clockType === idx,
        'text-light-blue opacity-40 focus-within:opacity-100 hover:opacity-100':
          clockType !== idx,
      }"
      v-for="(item, idx) in items"
    >
      <input
        type="radio"
        name="clock-type"
        :checked="idx === clockType"
        :value="idx"
        @change="$clockType.set(idx)"
        class="m-0 appearance-none"
      />
      {{ item }}
    </label>
  </div>

  {{ clockType }}
</template>
