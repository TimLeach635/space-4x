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
  currentPlanetIndex: number = 0;

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

    this.cutCameraToPlanetIndex(0);

    this.scene.input.keyboard.on("keydown-RIGHT", () => {
      if (this.currentPlanetIndex < this.planets.length - 1) {
        this.currentPlanetIndex++;
        this.panCameraToPlanetIndex(this.currentPlanetIndex);
      }
    });

    this.scene.input.keyboard.on("keydown-LEFT", () => {
      if (this.currentPlanetIndex > 0) {
        this.currentPlanetIndex--;
        this.panCameraToPlanetIndex(this.currentPlanetIndex);
      }
    });
  }

  cutCameraToPlanetIndex(index: number): void {
    if (index < 0 || index >= this.planets.length) {
      throw new Error(`Index ${index} is out of range of the list of planets (length ${this.planets.length})`);
    }
    const focusPlanet: WorldGameObject = this.planets[index].planet;
    this.scene.cameras.main.centerOn(focusPlanet.x, focusPlanet.y);
  }

  panCameraToPlanetIndex(index: number, duration: number = 200): void {
    if (index < 0 || index >= this.planets.length) {
      throw new Error(`Index ${index} is out of range of the list of planets (length ${this.planets.length})`);
    }
    const focusPlanet: WorldGameObject = this.planets[index].planet;
    this.scene.tweens.add({
      targets: this.scene.cameras.main,
      scrollX: focusPlanet.x - this.scene.cameras.main.width / 2,
      scrollY: focusPlanet.y - this.scene.cameras.main.height / 2,
      duration: duration,
      ease: "Cubic.easeInOut",
    });
  }
}
