import Goal from './goal/Goal.js'

function findDeep(goal, id) {
  if (goal.id === id) {
    return goal
  }

  for (let i = 0; i < goal.subgoals.length; i++) {
    const result = findDeep(goal.subgoals[i], id)
    if (result) {
      return result
    }
  }
  return false
}

function getActiveGoalFromUrlHash(root) {
  const hashID = window.location.hash.substring(1)
  if (hashID.length) {
    const goal = findDeep(root, parseInt(hashID, 10))
    if (goal) {
      return goal
    } else {
      return root
    }
  } else {
    return root
  }
}

function setUrlHash(id) {
  window.history.pushState('', '', '#' + id)
}

function convert(root) {
  const goal = new Goal({
    id: root.id,
    title: root.title,
    subgoals: [],
    completed: root.completed,
    isRoot: root.isRoot,
  })

  root.subgoals.forEach((g) => {
    goal.addSubgoal(convert(g))
  })
  return goal
}

function stringify(root) {
  return JSON.stringify(root, (key, val) => {
    if (key === 'parent') {
      return val.id
    }
    return val
  })
}

function saveToLocalStorage(goals, maxID) {
  const string = stringify(goals)
  localStorage.setItem('goals', string)
  localStorage.setItem('maxID', maxID)
}

const DEFAULT = new Goal({ id: 1, title: 'Home', isRoot: true })

function fetchFromLocalStorage() {
  let goals
  try {
    goals = convert(JSON.parse(localStorage.getItem('goals')))
  } catch (e) {
    return {
      goals: DEFAULT,
      maxID: 1,
    }
  }
  const maxID = parseInt(localStorage.getItem('maxID'), 10)
  return { goals, maxID }
}

function save(goals, maxID) {
  saveToLocalStorage(goals, maxID)
}

function fetch() {
  return fetchFromLocalStorage()
}

export default { findDeep, getActiveGoalFromUrlHash, setUrlHash, save, fetch }
