import particles from '../res/sprites/particles/*.png'
import { GameObjects, Math } from 'phaser'

export class Enemy extends GameObjects.Sprite {
  constructor(scene) {
    super(scene, 0, 0, 'enemy-basic')

    scene.physics.world.enable(this)
    scene.add.existing(this)
    scene.physics.add.overlap(this, scene.groups.bullets, this.onOverlap, () => {}, this)
    scene.physics.add.overlap(this, scene.groups.player, this.onOverlap, () => {}, this)
    scene.groups.enemies.add(this)

    this.setData('behaviors', [])
    this.setData('health', 0)
    this.setData('score', 1)
    this.dead = false
    this.body.setVelocityY(0)
    this.setActive(false)
    this.setVisible(false)
    this.body.enabled = false
    this.setDepth(1)
  }

  kill() {
    this.body.setVelocityY(0)
    this.setActive(false)
    this.setVisible(false)
    this.body.enabled = false
    this.getData('behaviors').forEach((behavior) => {
      behavior.destroy()
    })
    this.setData('behaviors', [])
  }

  onOverlap(me, them) {
    this.data.inc('health', -1)

    if (this.data.get('health') <= 0) {
      this.dead = true
    }
  }

  update(time, delta) {
    if (this.dead) {
      this.scene.data.inc('score', this.data.get('score'))
      this.scene.sound.play('explosion', {
        detune: Math.FloatBetween(0, 1000),
        volume: 0.35 * game.registry.get('sfxVolume')
      })
      const hitParticles = this.scene.add.particles(Object.keys(particles)[Math.Between(0, Object.keys(particles).length - 1)]).createEmitter({
        x: this.x,
        y: this.y,
        accelerationX: -10,
        accelerationY: -10,
        speed: {
          min: 75,
          max: 100
        },
        angle: {
          min: 0,
          max: 360
        },
        rotate: {
          min: 0,
          max: 20
        },
        radial: true,
        blendMode: 'SCREEN',
        lifespan: 500,
        alpha: {
          start: 1,
          end: 0
        },
        scale: {
          start: 0.5,
          end: 0
        }
      })
      hitParticles.explode(15)
      this.kill()
      return
    }

    if (this.y >= 700) {
      this.kill()
      return
    }

    if (this.data.get('behaviors').length) {
      this.data.get('behaviors').forEach(behavior => behavior.update(time, delta))
    }
  }

  spawn(name, x, y) {
    this.dead = false
    this.setPosition(x, y)
    this.body.setVelocityY(200)
    this.setActive(true)
    this.setVisible(true)
    this.body.enabled = true

    this.enemyData = this.scene.dataController.enemies.find(enemy => enemy.name === name)
    this.data.set('behaviors', this.scene.dataController.createBehaviors(this, name))
    this.data.set('health', this.enemyData.health)
    this.data.set('score', this.enemyData.score)
    this.setTexture(`enemy-${name}`)

    this.anims.play({
      key: `enemy-${name}-idle`,
      repeat: -1
    })
  }
}
