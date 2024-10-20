<script setup lang="ts">
import { $settings } from "@/i18n";
import { $settingsOpen } from "@/stores/settings-open";
import { useStore } from "@nanostores/vue";
import IconSettings from "./icons/IconSettings.vue";

const tl = useStore($settings);
</script>

<template>
  <button
    :aria-label="tl.heading"
    class="size-7 opacity-50 hover:opacity-100 focus:opacity-100"
    @click="$settingsOpen.set(true)"
  >
    <IconSettings />
  </button>
</template>
