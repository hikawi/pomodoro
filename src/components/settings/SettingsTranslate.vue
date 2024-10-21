<script setup lang="ts">
import { $settings } from "@/i18n";
import { useStore } from "@nanostores/vue";
import { $locale } from "@s/i18n";
import { computed } from "vue";

const tl = useStore($settings);
const locale = useStore($locale);
const options = computed(() => [
  { code: "en", value: tl.value.english, display: "Aa" },
  { code: "ja", value: tl.value.japanese, display: "あ" },
  { code: "vi", value: tl.value.vietnamese, display: "Aă" },
]);
</script>

<template>
  <div
    class="flex flex-col gap-4 py-6 text-center md:flex-row md:items-center md:justify-between"
  >
    <h3
      class="md:h4 text-center text-[0.6875rem] font-bold uppercase tracking-[0.26444rem] md:text-left"
    >
      {{ tl.language }}
    </h3>

    <div class="flex items-center justify-center gap-4" role="radiogroup">
      <button
        :aria-label="opt.value"
        :aria-checked="locale === opt.code"
        role="radio"
        v-for="opt in options"
        @click="$locale.set(opt.code)"
        class="flex size-10 items-center justify-center rounded-full ring-offset-4 hover:ring-1 hover:ring-light-blue focus:ring-1 focus:ring-light-blue"
        :class="{
          'bg-darker-blue text-white': locale === opt.code,
          'bg-almost-white text-dark-blue text-opacity-75': locale !== opt.code,
        }"
      >
        {{ opt.display }}
      </button>
    </div>
  </div>
</template>
