import { Physics } from 'phaser'

export class PlayerBullet extends Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'player-bullet')

    scene.add.existing(this)
    scene.physics.add.existing(this)
    scene.physics.add.overlap(this, scene.groups.enemies, this.onOverlap, () => {}, this)
    scene.groups.bullets.add(this)

    this.dead = false
    this.setVelocityY(-500)
    this.setDepth(1)
  }

  onOverlap(me, them) {
    if (them.body.enabled) {
      const hitParticles = this.scene.add.particles('spark').createEmitter({
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
          start: 0.25,
          end: 0
        }
      })
      hitParticles.explode(5)
      this.dead = true
    }
  }

  preUpdate(time, delta) {
    if (this.dead) {
      this.destroy()
    }

    if (this.y <= -50) {
      this.destroy()
    }
  }
}
