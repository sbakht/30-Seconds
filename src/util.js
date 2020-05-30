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

export default findDeep
