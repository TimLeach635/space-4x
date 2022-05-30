import Phaser from "phaser";

class MyScene extends Phaser.Scene
{
  preload = () => {
    
  };

  create = () => {
    const circle = this.scene.scene.add.arc(400, 300, 100, 0, 360, false, 0xffffff);
  };
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
