import behaviorObjects from '../behaviors/*.js'
import gameData from '../data/data.json'

export class DataController {
  constructor(scene) {
    this.gameData = gameData
    this.scene = scene

    this.enemies = this.gameData.sheets.find(sheet => sheet.name === 'enemies').lines
  }

  createBehaviors(actor, actorKey) {
    const enemyData = this.enemies.find(enemy => enemy.name === actorKey)

    return enemyData.behaviors.map((behavior) => {
      const newBehavior = new behaviorObjects[behavior.behavior].default(actor)

      newBehavior.initialize(behavior.data)

      return newBehavior
    })
  }

  update(time, delta) {}
}
