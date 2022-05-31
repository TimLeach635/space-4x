import Phaser from "phaser";

class MyScene extends Phaser.Scene
{
  background: Phaser.GameObjects.Image;
  earth: Phaser.GameObjects.Image;
  moon: Phaser.GameObjects.Image;

  preload = () => {
    this.load.image("space-bg", "assets/space-bg.png");
    this.load.image("earth", "assets/earth.png");
    this.load.image("moon", "assets/moon.png");
  };

  create = () => {
    this.background = this.add.image(200, 150, "space-bg");
    this.background.depth = -100;
    this.earth = this.add.image(200, 150, "earth");
    this.moon = this.add.image(200, 150, "moon");
  };

  updateMoonPosition(time: number): void {
    const orbitRadius = 60;
    const orbitCentreX = 200;
    const orbitCentreY = 150;
    const tilt = 0.7;  // should range from 0 to 1
    const period = 5000;  // in milliseconds

    this.moon.x = orbitCentreX + orbitRadius * Math.sin(time * 2 * Math.PI / period);
    this.moon.y = orbitCentreY + orbitRadius * Math.cos((time * 2 * Math.PI / period) + (tilt * Math.PI / 2));

    if (this.moon.x - orbitCentreX < orbitCentreY - this.moon.y) {
      this.moon.depth = -1;
    } else {
      this.moon.depth = 1;
    }
  }

  update(time: number, delta: number): void {
    this.updateMoonPosition(time);
  }
}

window.onload = () => {
  let game: Phaser.Game;

  game = new Phaser.Game({
    width: 400,
    height: 300,
    zoom: 2,
    pixelArt: true,
    type: Phaser.AUTO,
    parent: "content",
    title: "Space 4X",
    version: "0.0.1",
    scene: MyScene,
  });
}
