import { Math } from 'phaser'
import { Enemy } from '../actors/enemy'

const spawnInterval = 1000

export class EnemySpawnerController {
  constructor(scene) {
    this.scene = scene
    this.timeToSpawn = spawnInterval

    while (this.scene.groups.enemies.children.size < 50) {
      new Enemy(this.scene)
    }
  }

  update(time, delta) {
    this.timeToSpawn -= delta

    if (this.timeToSpawn <= 0 && this.scene.groups.enemies.getFirstDead()) {
      const deadEnemy = this.scene.groups.enemies.getFirstDead()

      deadEnemy.spawn(Math.Between(50, 750), -100)
      this.timeToSpawn = spawnInterval
    }
  }
}
