import { Scene } from 'phaser'
import music from '../res/music/*.mp3'

const musicVolumeDefault = 0.25

export class MusicScene extends Scene {
  constructor() {
    super({
      key: 'MusicScene'
    })
  }

  preload() {
    this.load.audio('after-dark', music['after-dark'])
  }

  create() {
    this.music = this.sound.add('after-dark', {
      loop: true,
      volume: musicVolumeDefault * game.registry.get('musicVolume')
    })
    this.music.play()

    game.registry.events.on('changedata', (parent, key, value, previousValue) => {
      switch (key) {
        case 'musicVolume':
          this.music.setVolume(musicVolumeDefault * value)
          break
      }
    }, this)
  }
}
