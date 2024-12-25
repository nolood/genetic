export enum ECell {
  START = "start",
  END = "end",
  EMPTY = "empty",
  WALL = "wall",
}

export class Cell {
  constructor(
    readonly x: number,
    readonly y: number,
    public type: ECell = ECell.EMPTY
  ) {}
}
