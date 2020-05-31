<script>
  import { createEventDispatcher } from "svelte";
  export let goal;
  let myInput;

  $: {
    if (myInput) myInput.focus();
  }

  const dispatch = createEventDispatcher();

  function onSave() {
    dispatch("save-goal");
  }

  function onDelete() {
    dispatch("deletion", { id: goal.id });
  }

  function onKey(e) {
    if (e.key === "Enter") onSave();
  }
</script>

<style>
  .todo {
    text-align: center;
    border: none;
    font-size: 60px;
    letter-spacing: 0.2em;
    color: rgba(0, 0, 0, 0.7);
    padding-left: 8px;
    padding-right: 8px;
    grid-column: 2;
    overflow-wrap: anywhere;
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

  button {
    border-radius: 30px;
    cursor: pointer;
    font-size: 30px;
  }

  .save {
    background: rgb(222, 222, 222);
  }

  .cancel {
    background: #f9f9f9;
  }
</style>

{#if goal.isPending}
  <div class="todo pushdown">
    <input
      bind:this={myInput}
      on:keypress={onKey}
      class="todo"
      type="text"
      placeholder="Type goal here..."
      bind:value={goal.title} />
    <button class="save" on:click={onSave}>Save Goal</button>
    <button class="cancel" on:click={onDelete}>Cancel</button>
  </div>
{:else}
  <div
    class="todo"
    class:complete={goal.completed}
    class:pushdown={goal.subgoals.length === 0}>
    {goal.title}
  </div>
{/if}
