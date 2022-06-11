const getPopulation = (
  time: number,
  initialPopulation: number,
  growthRate: number,
  capacity: number,
) => {
  const a = (capacity - initialPopulation) / initialPopulation;
  return capacity / (1 + a * Math.exp(- growthRate * time));
};

export class Population {
  value: number;
  growthRate: number;
  capacity: number;

  constructor(initialPopulation: number, growthRate: number, capacity: number) {
    this.value = initialPopulation;
    this.growthRate = growthRate;
    this.capacity = capacity;
  }

  update(delta: number): void {
    if (this.value !== 0) {
      this.value += getPopulation(delta, this.value, this.growthRate, this.capacity);
    } 
  }
}
