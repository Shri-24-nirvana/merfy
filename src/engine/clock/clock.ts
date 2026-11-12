export interface SimulationTime {
  tick: number;
  day: number;
  hour: number;
  formattedTime: string;
}

export class SimulationClock {
  private currentTick: number;
  private readonly ticksPerHour: number;
  private readonly hoursPerDay: number;

  constructor(ticksPerHour: number = 1, hoursPerDay: number = 24, initialTick: number = 0) {
    this.ticksPerHour = ticksPerHour;
    this.hoursPerDay = hoursPerDay;
    this.currentTick = initialTick;
  }

  public getTick(): number {
    return this.currentTick;
  }

  public advance(): number {
    this.currentTick += 1;
    return this.currentTick;
  }

  public getTime(): SimulationTime {
    return SimulationClock.calculateTime(this.currentTick, this.ticksPerHour, this.hoursPerDay);
  }

  public static calculateTime(tick: number, ticksPerHour: number = 1, hoursPerDay: number = 24): SimulationTime {
    const totalHours = Math.floor(tick / ticksPerHour);
    const day = Math.floor(totalHours / hoursPerDay) + 1; // 1-indexed days
    const hour = totalHours % hoursPerDay;
    const formattedHour = hour.toString().padStart(2, '0');
    return {
      tick,
      day,
      hour,
      formattedTime: `Day ${day}, ${formattedHour}:00`,
    };
  }

  public static getTicksPerDay(ticksPerHour: number = 1, hoursPerDay: number = 24): number {
    return ticksPerHour * hoursPerDay;
  }

  public reset(initialTick: number = 0): void {
    this.currentTick = initialTick;
  }
}
