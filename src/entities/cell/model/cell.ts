import { Agent } from "~/entities/agent/model/agent";

export enum ECell {
  START = "start",
  END = "end",
  EMPTY = "empty",
  WALL = "wall",
}

export class Cell {
  public agent: Agent[] | null = null;

  constructor(
    readonly x: number,
    readonly y: number,
    public type: ECell = ECell.EMPTY
  ) {}
}
