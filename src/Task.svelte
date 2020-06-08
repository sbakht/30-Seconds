<script>
  import { createEventDispatcher } from "svelte";
  export let goal;

  const dispatch = createEventDispatcher();

  function openTask(subgoal) {
    dispatch("open-goal", { subgoal });
  }
</script>

<style>
  .goals {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-column: 2;
    align-items: center;
    grid-gap: 40px;
  }

  .goal {
    padding: 16px 16px;
    color: rgb(0, 0, 0, 0.8);
    cursor: pointer;
    overflow-wrap: anywhere;
    border: 1px solid black;
    border-radius: 30px;
    text-align: center;
  }

  .goal:hover {
    background-color: #efefef;
  }

  .complete {
    color: rgb(0, 0, 0, 0.2);
  }

  @media (max-width: 900px) {
    .goals {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .count {
    font-weight: bold;
  }
</style>

<div class="goals">
  {#each goal.goal.subgoals as task}
    <div
      class="goal"
      class:complete={task.completed}
      on:click={() => openTask(task)}>
      {#if task.getSubgoalCount()}
        <span class="count">({task.getSubgoalCount()})</span>
      {/if}
      <span>{task.title}</span>
    </div>
  {/each}
</div>
