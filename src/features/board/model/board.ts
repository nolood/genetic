import { Agent, EAgentColor } from "~/entities/agent/model/agent";
import { Cell, ECell } from "~/entities/cell/model/cell";

export class Board {
  private map: Cell[][] = [];
  private start: Cell | null = null;
  private end: Cell | null = null;
  private agents: Agent[] = [];

  constructor(readonly size: number = 10) {}

  public init = (agentsCount: number = 5) => {
    this.createCells();
    this.setStartAndEndPoints();
    this.placeObstacles();
    this.createAgents(agentsCount);

    return this;
  };

  public updateAgents = () => {
    this.agents.forEach((agent) => agent.move(this));
  };

  public getCell(x: number, y: number): Cell {
    return this.map[y][x];
  }

  public getMap = () => {
    return this.map;
  };

  public getAgents = () => {
    return this.agents;
  };

  public getVisualizedMap = () => {
    return this.map.map((row) => row.map((cell) => cell.type));
  };

  private createAgents = (count: number) => {
    const agents: Agent[] = [];

    const getRandomAgentColor = () => {
      const colors = Object.values(EAgentColor);
      const randomIndex = Math.floor(Math.random() * colors.length);
      return colors[randomIndex];
    };

    if (!this.start || !this.end) {
      throw new Error("Start or end point not found");
    }

    for (let i = 0; i < count; i++) {
      agents.push(
        new Agent(this.start.x, this.start.y, getRandomAgentColor(), `${i}`)
      );
    }

    this.agents = agents;
  };

  private createCells() {
    for (let y = 0; y < this.size; y++) {
      const row: Cell[] = [];
      for (let x = 0; x < this.size; x++) {
        row.push(new Cell(x, y));
      }
      this.map.push(row);
    }
  }

  private setStartAndEndPoints() {
    const startX = Math.floor(Math.random() * this.size);
    const startY = this.size - 1;
    this.start = this.map[startY][startX];
    this.start.type = ECell.START;

    const endX = Math.floor(Math.random() * this.size);
    const endY = 0;
    this.end = this.map[endY][endX];
    this.end.type = ECell.END;
  }

  private placeObstacles() {
    const obstacleCount = Math.floor(this.size * this.size * 0.2);
    let placedObstacles = 0;

    while (placedObstacles < obstacleCount) {
      const randomX = Math.floor(Math.random() * this.size);
      const randomY = Math.floor(Math.random() * this.size);
      const cell = this.map[randomY][randomX];

      if (
        cell.type === ECell.EMPTY &&
        cell !== this.start &&
        cell !== this.end
      ) {
        cell.type = ECell.WALL;
        if (!this.isPathBlocked()) {
          placedObstacles++;
        } else {
          cell.type = ECell.EMPTY;
        }
      }
    }
  }

  private isPathBlocked(): boolean {
    return !this.canReach(this.start!, this.end!);
  }

  private canReach(start: Cell, end: Cell): boolean {
    const visited: Set<Cell> = new Set();
    const queue: Cell[] = [start];

    while (queue.length > 0) {
      const currentCell = queue.shift()!;
      if (currentCell === end) return true;
      visited.add(currentCell);

      const neighbors = [
        { x: currentCell.x - 1, y: currentCell.y },
        { x: currentCell.x + 1, y: currentCell.y },
        { x: currentCell.x, y: currentCell.y - 1 },
        { x: currentCell.x, y: currentCell.y + 1 },
      ];

      for (const { x, y } of neighbors) {
        if (x >= 0 && x < this.size && y >= 0 && y < this.size) {
          const neighborCell = this.map[y][x];
          if (!visited.has(neighborCell) && neighborCell.type !== ECell.WALL) {
            queue.push(neighborCell);
          }
        }
      }
    }

    return false;
  }
}
