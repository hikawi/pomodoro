<script setup lang="ts">
import { $settings } from "@/i18n";
import { useStore } from "@nanostores/vue";
import { $bgColor } from "@s/pomodoro";
import { $settingsOpen } from "@s/settings-open.ts";
import { onMounted, useTemplateRef } from "vue";
import SettingsColor from "./SettingsColor.vue";
import SettingsFont from "./SettingsFont.vue";
import SettingsHeader from "./SettingsHeader.vue";
import SettingsTimeInput from "./SettingsTimeInput.vue";
import SettingsTranslate from "./SettingsTranslate.vue";

const settingsOpen = useStore($settingsOpen);
const tl = useStore($settings);
const bgColor = useStore($bgColor);

const dialog = useTemplateRef("dialog");

onMounted(() => {
  dialog.value?.focus();
});
</script>

<template>
  <div
    class="fixed inset-0 z-50 flex size-full items-center justify-center bg-[#0A0C1C] bg-opacity-50 px-6 py-10 text-darker-blue"
    v-if="settingsOpen"
  >
    <div
      class="flex w-full max-w-[33.75rem] flex-col rounded-2xl bg-white"
      role="dialog"
      :aria-label="tl.dialog"
      ref="dialog"
      tabindex="-1"
    >
      <SettingsHeader />

      <div
        class="flex flex-col divide-y-[1px] divide-darker-blue divide-opacity-10 px-6"
      >
        <SettingsTimeInput />
        <SettingsFont />
        <SettingsColor />
        <SettingsTranslate />
      </div>

      <button
        class="relative mx-auto w-[8.75rem] translate-y-1/2 rounded-full py-5 font-bold text-white before:absolute before:inset-0 before:rounded-full before:bg-white before:opacity-0 hover:before:opacity-20 focus:before:opacity-20"
        :class="bgColor"
        @click="$settingsOpen.set(false)"
      >
        {{ tl.apply }}
      </button>
    </div>
  </div>
</template>
