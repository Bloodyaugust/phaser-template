import { Math } from 'phaser'
import Chance from 'chance'
import { Enemy } from '../actors/enemy'

const spawnInterval = 1000

export class EnemySpawnerController {
  constructor(scene) {
    this.scene = scene
    this.timeToSpawn = spawnInterval
    this.enemyChance = new Chance()

    while (this.scene.groups.enemies.children.size < 50) {
      new Enemy(this.scene)
    }
  }

  update(time, delta) {
    this.timeToSpawn -= delta

    if (this.timeToSpawn <= 0 && this.scene.groups.enemies.getFirstDead()) {
      const deadEnemy = this.scene.groups.enemies.getFirstDead()

      deadEnemy.spawn(this.enemyChance.weighted(['basic', 'buff'], [5, 1]), Math.Between(50, 750), -100)
      this.timeToSpawn = spawnInterval
    }
  }
}
