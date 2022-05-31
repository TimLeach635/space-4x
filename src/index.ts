import Phaser from "phaser";

class MyScene extends Phaser.Scene
{
  planet: Phaser.GameObjects.Arc;
  moon: Phaser.GameObjects.Arc;

  preload = () => {
    
  };

  create = () => {
    this.planet = this.add.arc(400, 300, 80, 0, 360, false, 0xaaffff);
    this.moon = this.add.arc(400, 300, 20, 0, 360, false, 0xffffff);
  };

  updateMoonPosition(time: number): void {
    const orbitRadius = 120;
    const orbitCentreX = 400;
    const orbitCentreY = 300;
    const tilt = 0.7;  // should range from 0 to 1
    const period = 5000;  // in milliseconds

    this.moon.x = orbitCentreX + orbitRadius * Math.sin(time * 2 * Math.PI / period);
    this.moon.y = orbitCentreY + orbitRadius * Math.cos((time * 2 * Math.PI / period) + (tilt * Math.PI / 2));
  }

  update(time: number, delta: number): void {
    this.updateMoonPosition(time);
  }
}

window.onload = () => {
  let game: Phaser.Game;

  game = new Phaser.Game({
    width: 800,
    height: 600,
    type: Phaser.AUTO,
    parent: "content",
    title: "Space 4X",
    version: "0.0.1",
    scene: MyScene,
  });
}
