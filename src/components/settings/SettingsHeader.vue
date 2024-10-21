<script setup lang="ts">
import { $settings } from "@/i18n";
import IconClose from "@c/icons/IconClose.vue";
import { useStore } from "@nanostores/vue";
import { $settingsOpen } from "@s/settings-open.ts";

const tl = useStore($settings);
</script>

<template>
  <div
    class="flex h-[4.5rem] w-full items-center justify-between border-b-[1px] border-[#E3E1E1] px-6 md:h-[5.81rem] md:px-10"
  >
    <h2 class="h2 text-[1.25rem] md:text-[1.75rem]">{{ tl.heading }}</h2>
    <button
      @click="$settingsOpen.set(false)"
      :aria-label="tl.close"
      class="size-3.5 opacity-50 hover:opacity-100"
    >
      <IconClose />
    </button>
  </div>
</template>
