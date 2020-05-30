<script>
  import { createEventDispatcher } from "svelte";
  export let goal;
  export let add = true;
  export let complete = true;
  export let clear = false;
  export let remove = true;

  const dispatch = createEventDispatcher();

  function onSave() {}

  function onAdd() {
    dispatch("adding");
  }

  function onComplete() {
    dispatch("completion");
  }

  function onClear() {
    dispatch("uncompletion");
  }

  function onDelete() {
    dispatch("deletion", { id: goal.goal.id });
  }
</script>

<style>
  .icons {
    display: flex;
    justify-content: space-between;
    flex-shrink: 0;
    padding: 0 8px 5px 8px;
    grid-column: 1/-1;
    align-items: flex-end;
  }

  .icons svg {
    cursor: pointer;
  }

  .pending {
    justify-content: flex-end;
  }
</style>

<div class="icons" class:pending={goal.goal.isPending}>

  {#if add}
    <svg
      on:click={onAdd}
      class="add"
      width="81"
      height="73"
      viewBox="0 0 81 73"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <ellipse
        cx="40.5"
        cy="36.5"
        rx="40.5"
        ry="36.5"
        fill="black"
        fill-opacity="0.1" />
      <path
        d="M48.375
        37.625H41.625V44.375H39.375V37.625H32.625V35.375H39.375V28.625H41.625V35.375H48.375V37.625Z"
        fill="black" />
    </svg>
  {/if}

  {#if complete && !goal.goal.isRoot}
    <svg
      on:click={onComplete}
      class="complete"
      width="81"
      height="73"
      viewBox="0 0 81 73"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      }
      <ellipse
        cx="40.5"
        cy="36.5"
        rx="40.5"
        ry="36.5"
        fill="black"
        fill-opacity="0.1" />
      <path
        d="M37.125 41.225L32.4 36.5L30.825 38.075L37.125 44.375L50.625
        30.875L49.05 29.3L37.125 41.225Z"
        fill="black" />
    </svg>
  {/if}

  {#if clear && !goal.goal.isRoot}
    <svg
      on:click={onClear}
      class="clear"
      width="81"
      height="73"
      viewBox="0 0 81 73"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M81 36.5C81 56.6584 62.8675 73 40.5 73C18.1325 73 0 56.6584 0 36.5C0
        16.3416 18.1325 0 40.5 0C62.8675 0 81 16.3416 81 36.5Z"
        fill="black"
        fill-opacity="0.1" />
      <path
        d="M48.375 30.2112L46.7888 28.625L40.5 34.9138L34.2112 28.625L32.625
        30.2112L38.9138 36.5L32.625 42.7888L34.2112 44.375L40.5 38.0862L46.7888
        44.375L48.375 42.7888L42.0862 36.5L48.375 30.2112Z"
        fill="black" />
    </svg>
  {/if}

  {#if remove && !goal.goal.isRoot}
    <svg
      on:click={onDelete}
      class="delete"
      width="81"
      height="73"
      viewBox="0 0 81 73"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M35 44C35 45.1 35.9 46 37 46H45C46.1 46 47 45.1 47 44V32H35V44ZM48
        29H44.5L43.5 28H38.5L37.5 29H34V31H48V29Z"
        fill="black" />
      <ellipse
        cx="40.5"
        cy="36.5"
        rx="40.5"
        ry="36.5"
        fill="black"
        fill-opacity="0.1" />
    </svg>
  {/if}
</div>
