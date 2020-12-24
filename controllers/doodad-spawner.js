import { Math } from 'phaser'
import { Doodad } from '../actors/doodad'

export class DoodadSpawnerController {
  constructor(scene) {
    this.scene = scene

    while (this.scene.groups.doodads.children.size < 75) {
      new Doodad(this.scene)
    }
  }

  update(time, delta) {
    this.timeToSpawn -= delta

    if (this.scene.groups.doodads.getFirstDead()) {
      const doodad = this.scene.groups.doodads.getFirstDead()

      doodad.spawn(Math.Between(-50, 850), Math.Between(-700, -100))
    }
  }
}
