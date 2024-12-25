import { ECell } from "~/entities/cell/model/cell";
import { Board } from "~/features/board/model/board";

export enum EAgentColor {
  RED = "red",
  GREEN = "green",
  BLUE = "blue",
  PURPLE = "purple",
  YELLOW = "yellow",
  ORANGE = "orange",
}

export class Agent {
  private visitedCells: Set<string> = new Set();
  constructor(
    public x: number,
    public y: number,
    public color: EAgentColor,
    public name = "NoName"
  ) {}

  private getDirectionToEnd(
    endX: number,
    endY: number
  ): { dx: number; dy: number } {
    const dx = endX > this.x ? 1 : endX < this.x ? -1 : 0;
    const dy = endY > this.y ? 1 : endY < this.y ? -1 : 0;
    return { dx, dy };
  }

  private getRandomDirection(): { dx: number; dy: number } {
    const directions = [
      { dx: 0, dy: -1 },
      { dx: 0, dy: 1 },
      { dx: -1, dy: 0 },
      { dx: 1, dy: 0 },
    ];
    return directions[Math.floor(Math.random() * directions.length)];
  }

  private getNeighbors(board: Board): { x: number; y: number }[] {
    const directions = [
      { x: this.x - 1, y: this.y },
      { x: this.x + 1, y: this.y },
      { x: this.x, y: this.y - 1 },
      { x: this.x, y: this.y + 1 },
    ];

    return directions.filter(({ x, y }) => {
      if (x < 0 || x >= board.size || y < 0 || y >= board.size) return false;

      const cell = board.getCell(x, y);
      const cellKey = `${x},${y}`;
      return (
        cell.type !== ECell.WALL && // Не стена
        !this.visitedCells.has(cellKey) // Не посещённая ранее ячейка
      );
    });
  }

  move(board: Board) {
    // Запоминаем текущую ячейку как посещённую
    this.visitedCells.add(`${this.x},${this.y}`);

    // Получаем доступные соседние ячейки
    const neighbors = this.getNeighbors(board);

    // Если доступных соседей нет, пытаемся двигаться в любое доступное направление
    if (neighbors.length === 0) {
      const randomDirection = this.getRandomDirection();
      const newX = this.x + randomDirection.dx;
      const newY = this.y + randomDirection.dy;

      if (
        newX >= 0 &&
        newX < board.size &&
        newY >= 0 &&
        newY < board.size &&
        board.getCell(newX, newY).type !== ECell.WALL
      ) {
        this.x = newX;
        this.y = newY;
      }

      return;
    }

    // Двигаемся в случайную доступную соседнюю ячейку
    const nextCell = neighbors[Math.floor(Math.random() * neighbors.length)];
    this.x = nextCell.x;
    this.y = nextCell.y;

    // Если достигли точки `end`, логируем успех
    const targetCell = board.getCell(this.x, this.y);
    if (targetCell.type === ECell.END) {
      console.log(`${this.name} нашёл точку END!`);
    }
  }
}
