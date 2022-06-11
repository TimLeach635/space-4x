import Phaser from "phaser";
import { populationStyleFormat } from "../util/formatters";

const getPopulation = (
  time: number,
  initialPopulation: number,
  growthRate: number,
  capacity: number
) => {
  const a = (capacity - initialPopulation) / initialPopulation;
  const pop = capacity / (1 + a * Math.exp(-growthRate * time));
  return pop;
};

export class Population {
  scene: Phaser.Scene;
  value: number;
  growthRate: number;
  capacity: number;

  constructor(
    scene: Phaser.Scene,
    initialPopulation: number,
    growthRate: number,
    capacity: number
  ) {
    this.scene = scene;
    this.value = initialPopulation;
    this.growthRate = growthRate;
    this.capacity = capacity;

    this.scene.events.on(
      "update",
      (_: number, delta: number) => this.update(delta),
      this
    );
  }

  update(delta: number): void {
    if (this.value !== 0) {
      this.value = getPopulation(
        delta,
        this.value,
        this.growthRate,
        this.capacity
      );
    }
  }

  public get populationString(): string {
    return populationStyleFormat(this.value);
  }
}
