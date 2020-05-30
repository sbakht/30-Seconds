<script>
  import Header from "./Header.svelte";
  import Title from "./Goal.svelte";
  import Icons from "./Icons.svelte";
  import Task from "./Task.svelte";
  import Goal from "./goal/Goal.js";
  import ActiveGoal from "./goal/ActiveGoal.js";
  import Util from "./util.js";

  let { goals: root, maxID } = Util.fetch();
  let activeGoal = new ActiveGoal(Util.getActiveGoalFromUrlHash(root));

  let hasUnfinishedTasks;
  let parentIsNotCompleted = true;
  $: {
    hasUnfinishedTasks = activeGoal.hasPendingSubgoals();
    parentIsNotCompleted = !activeGoal.isParentCompleted();
  }

  function openTask(e) {
    activeGoal.goInto(e.detail.subgoal.id);
    activeGoal = activeGoal;
    Util.setUrlHash(activeGoal.getId());
  }

  function onAddition() {
    const goal = new Goal({ id: ++maxID, title: "", isPending: true });
    activeGoal.addSubgoal(goal);
    activeGoal.goInto(goal.id);
    activeGoal = activeGoal;
    Util.setUrlHash(activeGoal.getId());
  }

  function onSave() {
    activeGoal.goal.isPending = false;
    goBack();
    Util.save(root, maxID);
  }

  function onCompletion() {
    activeGoal.setCompleted();
    goBack();
    Util.save(root, maxID);
  }

  function onUncompletion() {
    activeGoal.setUnfinished();
    activeGoal = activeGoal;
    Util.save(root, maxID);
  }

  function onDeletion(e) {
    goBack();
    activeGoal.removeSubgoal(e.detail.id);
    Util.save(root, maxID);
  }

  window.addEventListener("popstate", () => {
    activeGoal = new ActiveGoal(Util.getActiveGoalFromUrlHash(root));
  });

  function goBack() {
    activeGoal.goUp();
    activeGoal = activeGoal;
    Util.setUrlHash(activeGoal.getId());
  }
</script>

<style>
  #container {
    width: 100%;
    display: grid;
    flex-direction: column;
    height: 100%;
    grid-template-columns: 100px 1fr 100px;
  }

  @media (max-width: 599px) {
    #container {
      grid-template-columns: 16px 1fr 16px;
    }
  }
</style>

<div id="container">
  <Header on:go-back={goBack} />
  <Title
    {hasUnfinishedTasks}
    goal={activeGoal.goal}
    on:save-goal={onSave}
    on:deletion={onDeletion} />
  <Task goal={activeGoal} on:open-goal={openTask} />
  <Icons
    goal={activeGoal}
    add={!activeGoal.goal.isPending}
    complete={!hasUnfinishedTasks && !activeGoal.goal.completed && !activeGoal.goal.isPending}
    clear={activeGoal.goal.completed && parentIsNotCompleted}
    on:adding={onAddition}
    on:completion={onCompletion}
    on:deletion={onDeletion}
    on:uncompletion={onUncompletion} />
</div>
