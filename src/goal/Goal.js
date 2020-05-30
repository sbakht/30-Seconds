class Goal {
  constructor({ id, title, subgoals = [], parent, isRoot, completed = false }) {
    this.id = id
    this.title = title
    this.subgoals = subgoals
    this.completed = !!completed
    if (!isRoot) {
      this.parent = parent
    } else {
      this.isRoot = true
    }

    this.subgoals.forEach((g) => (g.parent = this))
  }

  setParent(parent) {
    this.parent = parent
  }

  addSubgoal(goal) {
    goal.setParent(this)
    this.subgoals.push(goal)
    this.sortSubgoals()
  }

  removeSubgoal(id) {
    this.subgoals = this.subgoals.filter((g) => g.id !== id)
  }

  findSubgoal(id) {
    return this.subgoals.find((g) => g.id === id)
  }

  setCompleted() {
    this.completed = true
  }

  setUnfinished() {
    this.completed = false
  }

  sortSubgoals() {
    this.subgoals.sort((t1, t2) => {
      if (t1.completed && !t2.completed) {
        return 1
      }
      if (!t1.completed && t2.completed) {
        return -1
      }
      return 0
    })
  }
}

export default Goal
