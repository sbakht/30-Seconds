<style>
  .todo {
    text-align: center;
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
    color: rgb(0, 0, 0, .2);
  }

</style>

<script>
    export let task;
    export let hasUnfinishedTasks;
</script>

<div class="todo" class:complete={task.completed} class:pushdown={!hasUnfinishedTasks}>{task.title}</div>