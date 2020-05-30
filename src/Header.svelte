<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  function goBack() {
    dispatch("go-back");
  }
</script>

<style>
  .header__title {
    text-align: center;
    padding-top: 16px;
    font-size: 36px;
    letter-spacing: 0.5em;
    color: rgba(0, 0, 0, 0.7);
    grid-column: 2;
  }
</style>

<div class="header__title">
  30 SECONDS
  <div on:click={goBack}>Go back</div>
</div>
