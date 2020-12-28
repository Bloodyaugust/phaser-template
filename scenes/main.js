import { Scene } from 'phaser'
import { Player } from '../actors/player'
import { DataController } from '../controllers/data-controller'
import { DoodadSpawnerController } from '../controllers/doodad-spawner'
import { EnemySpawnerController } from '../controllers/enemy-spawner'
import backgrounds from '../res/backgrounds/*.png'
import doodads from '../res/sprites/doodads/*.png'
import particles from '../res/sprites/particles/*.png'
import sprites from '../res/sprites/*.png'
import enemySprites from '../res/sprites/enemies/*.png'
import enemyAnimations from '../res/sprites/enemies/*.json'
import sfx from '../res/sfx/*.ogg'
import { GameState } from '../constants/game-state'

export class MainScene extends Scene {
  constructor() {
    super({
      data: {
        score: 0
      },
      key: 'MainScene'
    })
  }

  preload() {
    this.load.image('player', sprites.player)
    this.load.image('player-bullet', sprites['player-bullet'])
    this.load.image('spark', sprites.spark)
    this.load.image('layer1', backgrounds.layer1)

    Object.keys(doodads).forEach((doodadKey) => {
      this.load.image(doodadKey, doodads[doodadKey])
    })
    Object.keys(particles).forEach((particleKey) => {
      this.load.image(particleKey, particles[particleKey])
    })
    Object.keys(enemySprites).forEach((enemySpriteKey) => {
      if (enemyAnimations[enemySpriteKey]) {
        this.load.aseprite(enemySpriteKey, enemySprites[enemySpriteKey], enemyAnimations[enemySpriteKey])
      } else {
        this.load.image(enemySpriteKey, enemySprites[enemySpriteKey])
      }
    })

    this.load.audio('explosion', sfx.explosion)
    this.load.audio('laser', sfx.laser)
    this.load.audio('lose', sfx.lose)
  }
  
  create() {
    Object.keys(enemyAnimations).forEach((enemyAnimationKey) => {
      this.anims.createFromAseprite(enemyAnimationKey)
    })

    this.groups = {
      bullets: this.physics.add.group({name: 'bullets'}),
      doodads: this.add.group({name: 'doodads', runChildUpdate: true}),
      enemies: this.physics.add.group({name: 'enemies', runChildUpdate: true}),
      player: this.physics.add.group({name: 'player'})
    }

    this.dataController = new DataController(this)
    this.controllers = [
      this.dataController,
      new EnemySpawnerController(this),
      new DoodadSpawnerController(this)
    ]

    this.backgrounds = []
    this.backgrounds.push(this.add.tileSprite(0, 0, this.game.config.width, this.game.config.height, 'layer1').setOrigin(0, 0).setDepth(-1))

    this.data.events.on('changedata', (parent, key, value, previousValue) => {
      window.dispatchEvent(new CustomEvent('gameStateChanged', {
        detail: {...this.data.values}
      }))

      if (key === 'game') {
        switch (value) {
          case GameState.GAME_OVER:
            if (this.data.get('view') === GameState.VIEW_GAME_HUD) {
              this.scene.restart()
            }
            break

          case GameState.GAME_PAUSED:
            this.scene.pause('MainScene')
            break
          
          case GameState.GAME_PLAYING:
            this.scene.resume('MainScene')
            break
        }
      }

      if (key === 'score' && value > this.data.get('highScore')) {
        this.data.set('highScore', value)
        localStorage.setItem('highScore', value)
      }
    }, this)

    this.data.events.on('setdata', (parent, key, value) => {
      window.dispatchEvent(new CustomEvent('gameStateChanged', {
        detail: {...this.data.values}
      }))
    }, this)

    this.data.set('game', GameState.GAME_OVER)
    this.data.set('highScore', localStorage.getItem('highScore') || 0)
    this.data.set('view', GameState.VIEW_MAIN_MENU)

    new Player(this, 400, 550)
    this.scene.pause('MainScene')

    window.dispatchEvent(new CustomEvent('mainSceneCreated', {
      detail: {
        scene: this
      }
    }))

    this.events.once('shutdown', () => {
      this.data.events.off('setdata')
      this.data.events.off('changedata')

      this.data.set('score', 0)
    }, this)
  }

  update(time, delta) {
    window.dispatchEvent(new CustomEvent('gameStateChanged', {
      detail: {delta}
    }))

    this.controllers.forEach((controller) => {
      controller.update(time, delta)
    })

    this.backgrounds[0].tilePositionY -= 15 * (delta / 1000)
  }
}
