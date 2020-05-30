<script>
  import Header from "./Header.svelte";
  import Title from "./Goal.svelte";
  import Icons from "./Icons.svelte";
  import Task from "./Task.svelte";
  import Goal from "./goal/Goal.js";
  import ActiveGoal from "./goal/ActiveGoal.js";
  import Util from "./util.js";

  const root = new Goal({ id: 1, title: "Home", isRoot: true });
  const g1 = new Goal({ id: 2, title: "Buy Kiddo protecc" });
  const g2 = new Goal({
    id: 3,
    title: "Open Universe website",
    completed: true
  });
  const g4 = new Goal({ id: 5, title: "Dance with a chicken" });
  const g3 = new Goal({ id: 4, title: "Get credit card", subgoals: [g4] });
  const g5 = new Goal({
    id: 5,
    title:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    subgoals: []
  });
  root.addSubgoal(g1);
  g1.addSubgoal(g2);
  g1.addSubgoal(g3);
  g1.addSubgoal(g5);

  // let index = 0;
  let activeGoal = new ActiveGoal(Util.getActiveGoalFromUrlHash(root));
  let maxID = 5;

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
  }

  function onCompletion() {
    activeGoal.setCompleted();
    goBack();
  }

  function onUncompletion() {
    activeGoal.setUnfinished();
    activeGoal = activeGoal;
  }

  function onDeletion(e) {
    goBack();
    activeGoal.removeSubgoal(e.detail.id);
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
