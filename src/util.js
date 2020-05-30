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

export default { findDeep, getActiveGoalFromUrlHash, setUrlHash }
