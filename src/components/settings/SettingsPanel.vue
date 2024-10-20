<script setup lang="ts">
import { $settings } from "@/i18n";
import IconClose from "@c/icons/IconClose.vue";
import { useStore } from "@nanostores/vue";
import { $settingsOpen } from "@s/settings-open.ts";

const settingsOpen = useStore($settingsOpen);
const tl = useStore($settings);
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

      <div class="flex flex-col px-6">
        <div class="flex flex-col gap-4 py-6">
          <h3
            class="md:h4 text-center text-[0.6875rem] font-bold tracking-[0.26444rem]"
          >
            {{ tl.time }}
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>
