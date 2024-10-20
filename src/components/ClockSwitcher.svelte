<script lang="ts">
  import { clockType } from "@/stores/clock-type.ts";
  import { clockSwitcher } from "@/i18n/";

  const active = "text-dark-blue focus-within:animate-pulse";
  const inactive =
    "text-light-blue opacity-40 hover:opacity-100 focus-within:opacity-100";

  $: sliderClass = ["translate-x-0", "translate-x-full", "translate-x-[200%]"][
    $clockType
  ];

  $: items = [
    $clockSwitcher.pomodoro,
    $clockSwitcher.shortBreak,
    $clockSwitcher.longBreak,
  ];
</script>

<div
  class="body1 relative grid w-full grid-cols-3 place-content-center rounded-full bg-darker-blue px-1.5 py-2 text-center text-dark-blue"
  role="radiogroup"
  aria-label={$clockSwitcher.radioGroup}
>
  <div class="absolute inset-x-1.5 inset-y-2 z-0 rounded-full">
    <div
      data-testid="slider"
      class="absolute inset-0 w-1/3 rounded-full bg-red duration-200 {sliderClass}"
    ></div>
  </div>

  {#each items as item, idx}
    <label
      class="relative z-[1] flex h-12 items-center justify-center rounded-full {$clockType ===
      idx
        ? active
        : inactive}"
    >
      <input
        type="radio"
        name="clock-type"
        checked={$clockType === idx}
        value={idx}
        on:change={() => ($clockType = idx)}
        class="m-0 appearance-none"
      />
      {item}
    </label>
  {/each}
</div>
