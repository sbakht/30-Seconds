<script>
  import Header from "./Header.svelte";
  import Title from "./Goal.svelte";
  import Icons from "./Icons.svelte";
  import Task from "./Task.svelte";
  import hash from "./hasher.js";
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

  let hasUnfinishedTasks;
  let parentIsNotCompleted = true;
  $: {
    hasUnfinishedTasks = activeGoal.hasPendingSubgoals();
    parentIsNotCompleted = !activeGoal.isParentCompleted();
  }

  function openTask(e) {
    const subgoal = e.detail.subgoal;
    activeGoal.goInto(subgoal.id);
    activeGoal = activeGoal;
    // window.history.pushState(history.length, "", "#" + hash(activeTask.title));
    // history.push(activeTask);
    // index++;
  }

  function onCompletion() {
    activeGoal.setCompleted();
    goBack();
  }

  function onUncompletion() {
    activeGoal.setUnfinished();
    activeGoal = activeGoal;
  }

  // window.addEventListener('popstate', (event) => {
  // debugger;
  // 	if(history.length) {
  // 		if(event.state > index) {
  // 			index++;
  // 		}else{
  // 			index--;
  // 		}
  // 		activeTask = history[index];
  // 	}
  // });

  function goBack() {
    activeGoal.goUp();
    activeGoal = activeGoal;
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
  <Title {hasUnfinishedTasks} goal={activeGoal.goal} />
  <Task goal={activeGoal} on:open-goal={openTask} />
  <Icons
    goal={activeGoal}
    complete={!hasUnfinishedTasks && !activeGoal.goal.completed}
    clear={activeGoal.goal.completed && parentIsNotCompleted}
    on:completion={onCompletion}
    on:uncompletion={onUncompletion} />
</div>
