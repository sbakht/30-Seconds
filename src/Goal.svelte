<script>
  import { createEventDispatcher } from "svelte";
  export let goal;
  export let hasUnfinishedTasks;
  let title = "";

  const dispatch = createEventDispatcher();

  function onSave() {
    dispatch("save-goal");
  }

  function onDelete() {
    dispatch("deletion", { id: goal.id });
  }
</script>

<style>
  .todo {
    text-align: center;
    border: none;
    font-size: 48px;
    letter-spacing: 0.2em;
    color: rgba(0, 0, 0, 0.7);
    margin-top: 75px;
    padding-left: 8px;
    padding-right: 8px;
    grid-column: 2;
  }

  .pushdown {
    margin-top: 225px;
  }

  .complete {
    color: rgb(0, 0, 0, 0.2);
  }

  input {
    width: 100%;
  }
</style>

{#if goal.isPending}
  <div class="todo pushdown">
    <input
      class="todo"
      type="text"
      placeholder="Type goal here..."
      bind:value={goal.title} />
    <button on:click={onSave}>Save Goal</button>
    <button on:click={onDelete}>Cancel</button>
  </div>
{:else}
  <div
    class="todo"
    class:complete={goal.completed}
    class:pushdown={!hasUnfinishedTasks}>
    {goal.title}
  </div>
{/if}
