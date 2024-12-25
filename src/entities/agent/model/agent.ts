export enum EAgentColor {
  RED = "red",
  GREEN = "green",
  BLUE = "blue",
  PURPLE = "purple",
  YELLOW = "yellow",
  ORANGE = "orange",
}

export class Agent {
  constructor(
    public x: number,
    public y: number,
    public color: EAgentColor,
    public name = "NoName"
  ) {}
}
