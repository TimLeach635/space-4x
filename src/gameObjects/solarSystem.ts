import { WorldGameObject, WorldConfig } from "./world";
import Phaser from "phaser";

interface SolarSystemConfig {
  planets: Array<{
    planet: WorldConfig;
    moons: Array<{
      moon: WorldConfig;
      orbitalRadius: number;
      orbitalPeriod: number;
    }>;
  }>;
}

interface Moon {
  moon: WorldGameObject;
  orbitalRadius: number; // for now, these are pixels and seconds
  orbitalPeriod: number; // I imagine I will change them to real units
}

interface Planet {
  planet: WorldGameObject;
  moons: Array<Moon>;
}

export class SolarSystemGameObject extends Phaser.GameObjects.Container {
  // constants
  distanceBetweenPlanets = 200;

  planets: Array<Planet>;

  constructor(scene: Phaser.Scene, config: SolarSystemConfig) {
    super(scene, 0, 0);

    this.planets = [];

    config.planets.forEach((planetConfig, i) => {
      const planetObject = new WorldGameObject(
        scene,
        planetConfig.planet,
        i * this.distanceBetweenPlanets,
        0
      );
      this.planets.push({ planet: planetObject, moons: [] });
      this.add(planetObject);
    });
  }
}
