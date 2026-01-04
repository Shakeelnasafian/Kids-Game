
class AudioService {
  private correctSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3');
  private wrongSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3');
  private clickSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');
  private winSound = new Audio('https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3');

  playCorrect() {
    this.correctSound.currentTime = 0;
    this.correctSound.play().catch(() => {});
  }

  playWrong() {
    this.wrongSound.currentTime = 0;
    this.wrongSound.play().catch(() => {});
  }

  playClick() {
    this.clickSound.currentTime = 0;
    this.clickSound.play().catch(() => {});
  }

  playWin() {
    this.winSound.currentTime = 0;
    this.winSound.play().catch(() => {});
  }
}

export const gameAudio = new AudioService();
