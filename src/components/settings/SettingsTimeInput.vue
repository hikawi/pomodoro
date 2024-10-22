<script setup lang="ts">
import { $settings } from "@/i18n";
import { useStore } from "@nanostores/vue";
import { $pomodoro } from "@s/pomodoro";
import { computed } from "vue";

const tl = useStore($settings);
const pomodoro = useStore($pomodoro);
const timeLabels = computed(() => [
  {
    label: tl.value.pomodoro,
    value: pomodoro.value.pomodoro,
    key: "pomodoro",
  },
  {
    label: tl.value.shortBreak,
    value: pomodoro.value.short,
    key: "short",
  },
  {
    label: tl.value.longBreak,
    value: pomodoro.value.long,
    key: "long",
  },
]);

function handleInput(key: any, e: Event) {
  const el = e.target as HTMLInputElement;
  $pomodoro.setKey(key, parseInt(el.value));
}
</script>

<template>
  <div class="flex flex-col gap-4 py-6">
    <h3
      class="md:h4 text-center text-[0.6875rem] font-bold uppercase tracking-[0.26444rem] md:text-left"
    >
      {{ tl.time }}
    </h3>

    <div
      class="body2 md:body1 flex flex-col gap-2 text-darker-blue md:grid md:grid-cols-3 md:gap-5"
    >
      <label
        class="grid w-full grid-cols-2 items-center md:grid-cols-1 md:gap-2"
        v-for="label in timeLabels"
      >
        <span class="text-dark-blue opacity-40">{{ label.label }}</span>
        <input
          type="number"
          class="h-10 rounded-xl bg-almost-white px-4 outline-none invalid:ring-2 invalid:ring-red valid:focus:ring-2 valid:focus:ring-sky-400"
          :value="label.value"
          @input.prevent="(e) => handleInput(label.key, e)"
        />
      </label>
    </div>
  </div>
</template>
