<style>
  .todo {
    text-align: center;
    padding-top: 24px;
    font-size: 48px;
    letter-spacing: 0.2em;
    color: rgba(0, 0, 0, 0.7);
    margin-top: 50px;
    padding-left: 8px;
    padding-right: 8px;
  }

  .pushdown {
    margin-top: 200px;
  }

</style>

<script>
    export let text;
    export let hasUnfinishedTasks;
</script>

<div class="todo" class:pushdown={!hasUnfinishedTasks}>{text}</div>