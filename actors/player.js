import { GameObjects } from 'phaser'
import { PlayerBullet } from './player-bullet'
import { GameState } from '../constants/game-state'

const fireInterval = 500

export class Player extends GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'player')

    scene.add.existing(this)
    scene.physics.world.enable(this)
    scene.physics.add.overlap(this, scene.groups.enemies, this.onEnemyOverlap, () => {}, this)
    scene.groups.player.add(this)

    this.cursorKeys = scene.input.keyboard.createCursorKeys()
    this.body.setCollideWorldBounds(true)
    this.timeToFire = fireInterval
    this.setDepth(1)
  }

  onEnemyOverlap(me, them) {
    if (them.body.enabled) {
      this.scene.data.set('game', GameState.GAME_OVER)
      this.scene.data.set('view', GameState.VIEW_MAIN_MENU)
      this.scene.sound.play('lose', {
        detune: Math.random() * 200,
        volume: 0.75 * game.registry.get('sfxVolume')
      })
    }
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta)

    this.timeToFire -= delta

    this.body.setVelocity(0)

    if (this.cursorKeys.left.isDown) {
      this.body.setVelocityX(-500)
    }
    if (this.cursorKeys.right.isDown) {
      this.body.setVelocityX(500)
    }

    if (this.cursorKeys.space.isDown && this.timeToFire <= 0) {
      this.timeToFire = fireInterval
      new PlayerBullet(this.scene, this.x, this.y)
      this.scene.sound.play('laser', {
        detune: Math.random() * 500,
        volume: 0.75 * game.registry.get('sfxVolume')
      })
    }
  }
}
