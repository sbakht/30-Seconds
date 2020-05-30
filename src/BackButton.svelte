<script>
  import { createEventDispatcher } from "svelte";
  export let isRoot;

  const dispatch = createEventDispatcher();

  function goBack() {
    dispatch("go-back");
  }
</script>

<style>
  svg {
    padding: 16px 0 0 16px;
    cursor: pointer;
  }
</style>

{#if !isRoot}
  <svg
    on:click={goBack}
    width="19"
    height="19"
    viewBox="0 0 19 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M18.5 8.375H4.80875L11.0975 2.08625L9.5 0.5L0.5 9.5L9.5 18.5L11.0862
      16.9138L4.80875 10.625H18.5V8.375Z"
      fill="black" />
  </svg>
{/if}
