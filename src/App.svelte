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

<script>
	import Header from './Header.svelte';
	import Goal from './Goal.svelte';
	import Icons from './Icons.svelte';
	import Task from './Task.svelte';
	import hash from './hasher.js';

	let tasks = {
	  isRoot: true,
		title: 'Home', 
		tasks: [
		{
			title: "Buy Kiddo protecc",
			tasks: [
				{title: "Open Universe website"},
				{title: "Check if smalls are in stock", completed: true},
				{title: "Get credit card", tasks: [{title: 'Dance with a chicken'}]},
				{title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
				{title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
			]
		}
	]};

	let index = [];
	let history = [];
	let activeTask = tasks;
	for(let i = 0; i < index.length; i++) {
		activeTask = activeTask.tasks[index[i]]
	}

	console.log(activeTask);
	pushCompletedToEnd();

	let hasUnfinishedTasks;
	let parentIsNotCompleted;
	$: { 
		hasUnfinishedTasks = hasOpenTasks(activeTask);
		if(history.length) {
			parentIsNotCompleted = !history[history.length-1].completed;
		}else{
			parentIsNotCompleted = true;
		}
	}

	function pushCompletedToEnd() {
		activeTask.tasks.sort((t1, t2) => {
			if(t1.completed && !t2.completed) {
				return 1;
			}
			if(!t1.completed && t2.completed) {
				return -1;
			}
			return 0;
		})
	}

	function hasOpenTasks(task) {
		return task.tasks && task.tasks.length && task.tasks.filter(t => !t.completed).length;
	}

	function openTask(e) {
		history.push(activeTask);
		const task = e.detail.task;
		activeTask = task;
		window.history.pushState(history, '', '#' + hash(activeTask.title))
	}

	function onCompletion() {
		activeTask.completed = true;
		if(history.length) {
			activeTask = history.pop();
		}
	}

	function onUncompletion() {
		activeTask.completed = false;
		if((!activeTask.tasks || activeTasks.tasks.length === 0) && history.length) {
			activeTask = history.pop();
		}
	}

	window.addEventListener('popstate', (event) => {
		if(history.length) {
			activeTask = history.pop();
		}
	});
</script>

<div id="container">
	<Header  />
	<Goal hasUnfinishedTasks={hasUnfinishedTasks} task={activeTask} />
	<Task tasks={activeTask.tasks || []} on:open-task={openTask} />
	<Icons
		task={activeTask}
		complete={!hasUnfinishedTasks && !activeTask.completed}
		clear={activeTask.completed && parentIsNotCompleted} 
		on:completion={onCompletion} 
		on:uncompletion={onUncompletion}/>
</div>