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
    padding: 100px 0;
    grid-column: 2;
  }

  .goal {
    padding: 16px 16px;
    color: rgb(0, 0, 0, 0.8);
    cursor: pointer;
    overflow-wrap: anywhere;
  }

  .complete {
    color: rgb(0, 0, 0, 0.2);
  }

  @media (max-width: 900px) {
    .goals {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>

<div class="goals">
  {#each goal.goal.subgoals as task}
    <div
      class="goal"
      class:complete={task.completed}
      on:click={() => openTask(task)}>
      {task.title}
    </div>
  {/each}
</div>
