<script setup lang="ts">
import { $settings } from "@/i18n";
import { useStore } from "@nanostores/vue";
import { $pomodoro } from "@s/pomodoro";
import { $settingsOpen } from "@s/settings-open.ts";
import SettingsHeader from "./SettingsHeader.vue";
import SettingsTimeInput from "./SettingsTimeInput.vue";

const settingsOpen = useStore($settingsOpen);
const tl = useStore($settings);
const pomodoro = useStore($pomodoro);
</script>

<template>
  <div
    class="fixed inset-0 z-50 flex size-full items-center justify-center bg-[#0A0C1C] bg-opacity-50 px-6 py-10 text-darker-blue"
    v-if="settingsOpen"
  >
    <div
      class="w-full max-w-[33.75rem] rounded-2xl bg-white"
      role="dialog"
      :aria-label="tl.dialog"
    >
      <SettingsHeader />

      <div class="flex flex-col px-6">
        <SettingsTimeInput />
      </div>
    </div>
  </div>
</template>
