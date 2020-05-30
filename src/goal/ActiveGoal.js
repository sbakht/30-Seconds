class ActiveGoal {
  constructor(goal) {
    this.goal = goal
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
}

export default ActiveGoal
