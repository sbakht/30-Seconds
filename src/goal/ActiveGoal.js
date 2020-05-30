class ActiveGoal {
  constructor(goal) {
    this.goal = goal
  }

  getId() {
    return this.goal.id
  }

  goUp() {
    if (this.goal.parent && !this.goal.isRoot) {
      this.goal = this.goal.parent
    }
  }

  getGoal() {
    return this.goal
  }

  goInto(id) {
    const subgoal = this.goal.findSubgoal(id)
    if (subgoal) {
      this.goal = subgoal
    }
  }

  setCompleted() {
    this.goal.setCompleted()
    this.goal.parent.sortSubgoals()
  }

  setUnfinished() {
    this.goal.setUnfinished()
    this.goal.parent.sortSubgoals()
  }

  hasPendingSubgoals() {
    return !!this.goal.subgoals.find((g) => !g.completed)
  }

  isParentCompleted() {
    if (this.goal.parent && !this.goal.isRoot) {
      return this.goal.parent.completed
    }
    return false
  }

  removeSubgoal(id) {
    this.goal.removeSubgoal(id)
  }
}

export default ActiveGoal
