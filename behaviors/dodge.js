import Behavior from './behavior'

export default class Dodge extends Behavior {
  constructor(parent) {
    super(parent)
  }

  destroy() {
    this.parent.body.setVelocityX(0)

    super.destroy()
  }

  initialize(data) {
    super.initialize(data)

    this.offset = Math.random() * 5000
  }

  update(time, delta) {
    this.parent.body.setVelocityX(Math.sin((time + this.offset) / 1000) * this.data.speed)
  }
}
