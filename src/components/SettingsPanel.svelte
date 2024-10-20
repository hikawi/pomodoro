<script lang="ts">
  import { settingsOpen } from "@/stores/settings-open.ts";
  import { settings } from "@/i18n/";
</script>

{#if $settingsOpen}
  <div
    class="fixed inset-0 z-50 flex size-full items-center justify-center bg-[#0A0C1C] bg-opacity-50 px-6 py-10 text-darker-blue"
  >
    <div class="w-full max-w-[33.75rem] rounded-2xl bg-white" role="dialog">
      <div
        class="flex h-[4.5rem] w-full items-center justify-between border-b-[1px] border-[#E3E1E1] px-6 md:h-[5.81rem] md:px-10"
      >
        <h2 class="h2 text-[1.25rem] md:text-[1.75rem]">{$settings.heading}</h2>
        <button
          on:click={() => ($settingsOpen = false)}
          aria-label="Close"
          class="opacity-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14"
            ><path
              fill="#1E213F"
              fill-rule="evenodd"
              d="M11.95.636l1.414 1.414L8.414 7l4.95 4.95-1.414 1.414L7 8.414l-4.95 4.95L.636 11.95 5.586 7 .636 2.05 2.05.636 7 5.586l4.95-4.95z"
            /></svg
          >
        </button>
      </div>

      <div class="flex flex-col px-6">
        <div class="flex flex-col gap-4 py-6">
          <h3>What</h3>
        </div>
      </div>
    </div>
  </div>
{/if}
