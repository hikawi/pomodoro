<script setup lang="ts">
import { $settings } from "@/i18n";
import IconSettings from "@c/icons/IconSettings.vue";
import { useStore } from "@nanostores/vue";
import { $settingsOpen } from "@s/settings-open";

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
