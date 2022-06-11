import Phaser from "phaser";
import { Population } from "./population";

export interface WorldConfig {
  texture: string;
  radius: number;
  name: string;
  initialPopulation: number;
  populationGrowthRate: number;
  populationCapacity: number;
  tintColour?: number;
}

// A "world" is an entity that humans can live on, that is separated by
// other worlds by SPACE TRAVEL specifically.
// Earth and the Moon are two different worlds, because you need to go
// through space to get from one to the other.
// Cambridge and London are not, because I don't need to take a rocket
// to go to London.
// Two outposts on Jupiter may be separate worlds if you can't travel
// between them without going into space and back. Discuss!
export class WorldGameObject extends Phaser.GameObjects.Container {
  image: Phaser.GameObjects.Image;
  name: string;
  tintColour: number;
  text: Phaser.GameObjects.Text;
  population: Population;

  constructor(
    scene: Phaser.Scene,
    config: WorldConfig,
    x?: number,
    y?: number
  ) {
    super(scene, x, y, []);
    this.image = new Phaser.GameObjects.Image(scene, 0, 0, config.texture);
    this.add(this.image);

    this.population = new Population(
      scene,
      config.initialPopulation,
      config.populationGrowthRate,
      config.populationCapacity
    );

    this.tintColour =
      config.tintColour !== undefined ? config.tintColour : 0xaaaaaa;

    this.name = config.name;
    this.text = new Phaser.GameObjects.Text(
      scene,
      config.radius + 5,
      0,
      config.name,
      {
        fontSize: "10px",
        color: `#${this.tintColour.toString(16).padStart(6, "0")}`,
        stroke: "#000",
        strokeThickness: 1,
      }
    );
    this.updateText();
    this.text.setOrigin(0, 0.5);
    this.add(this.text);

    this.type = "world";

    const earthShape = new Phaser.Geom.Circle(0, 0, config.radius);
    this.setInteractive(earthShape, Phaser.Geom.Circle.Contains);

    this.on(
      "pointerover",
      function () {
        this.image.setTint(this.tintColour);
      },
      this
    );

    this.on(
      "pointerout",
      function () {
        this.image.clearTint();
      },
      this
    );

    this.scene.events.on("update", this.updateText, this);
  }

  updateText(): void {
    this.text.setText([this.name, `Population: ${this.population.populationString}`]);
  }
}
