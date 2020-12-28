export default class Behavior {
  constructor(parent) {
    this.parent = parent
  }

  destroy() {
    this.parent = null
    this.data = null
  }

  initialize(data) {
    this.data = data
  }

  update(time, delta) {}
}
