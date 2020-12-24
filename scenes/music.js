import { Scene } from 'phaser'
import music from '../res/music/*.mp3'

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
      volume: 0.25
    })
    this.music.play()
  }
}
