<svelte:options tag="zora-zorb" accessors />
<script lang="ts">
  import { gradientForAddress } from "./lib";
  export let width = undefined;
  export let height = undefined;
  export let address;

  const gradientInfo = gradientForAddress(address || '0x0000000000000000000000000000000000000000');
</script>

<svg
  width={width}
  height={height}
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <defs>
    <radialGradient fx="64.96%" fy="24.36%" id="grad0">
      <stop offset="15.62%" stop-color={gradientInfo[0]} />
      <stop offset="39.58%" stop-color={gradientInfo[1]} />
      <stop offset="72.92%" stop-color={gradientInfo[2]} />
      <stop offset="90.62%" stop-color={gradientInfo[3]} />
      <stop offset="100%" stop-color={gradientInfo[4]} />
    </radialGradient>
  </defs>
  <circle cx="50%" cy="50%" r="50%" fill="url(#grad0)" />
</svg>