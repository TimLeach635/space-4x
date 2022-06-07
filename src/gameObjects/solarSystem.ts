import { WorldGameObject, WorldConfig } from "./world";
import Phaser from "phaser";

interface SolarSystemConfig {
  planets: Array<{
    planet: WorldConfig;
    moons: {
      moon: WorldConfig;
      orbitalRadius: number;
      orbitalPeriod: number;
    }
  }>;
}

interface Moon {
  moon: WorldGameObject;
  orbitalRadius: number;  // for now, these are pixels and seconds
  orbitalPeriod: number;  // I imagine I will change them to real units
}

interface Planet {
  planet: WorldGameObject;
  moons: Array<Moon>;
}

export class SolarSystemGameObject extends Phaser.GameObjects.GameObject {
  // constants
  distanceBetweenPlanets = 200;

  planets: Array<Planet>;

  constructor(
    scene: Phaser.Scene,
    config: SolarSystemConfig
  ) {
    super(scene, "solarSystem");

    this.planets = [];

    config.planets.forEach((planetConfig, i) => {
      
    });
  }
}
