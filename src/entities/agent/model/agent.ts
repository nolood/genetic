// import { ECell } from "~/entities/cell/model/cell";
// import { Board } from "~/features/board/model/board";

import { Board } from "~/features/board/model/board";

export enum EAgentColor {
  RED = "red",
  GREEN = "green",
  BLUE = "blue",
  PURPLE = "purple",
  YELLOW = "yellow",
  ORANGE = "orange",
}

// export class Agent {
//   private visitedCells: Set<string> = new Set();
//   constructor(
//     public x: number,
//     public y: number,
//     public color: EAgentColor,
//     public name = "NoName"
//   ) {}

//   private getDirectionToEnd(
//     endX: number,
//     endY: number
//   ): { dx: number; dy: number } {
//     const dx = endX > this.x ? 1 : endX < this.x ? -1 : 0;
//     const dy = endY > this.y ? 1 : endY < this.y ? -1 : 0;
//     return { dx, dy };
//   }

//   private getRandomDirection(): { dx: number; dy: number } {
//     const directions = [
//       { dx: 0, dy: -1 },
//       { dx: 0, dy: 1 },
//       { dx: -1, dy: 0 },
//       { dx: 1, dy: 0 },
//     ];
//     return directions[Math.floor(Math.random() * directions.length)];
//   }

//   private getNeighbors(board: Board): { x: number; y: number }[] {
//     const directions = [
//       { x: this.x - 1, y: this.y },
//       { x: this.x + 1, y: this.y },
//       { x: this.x, y: this.y - 1 },
//       { x: this.x, y: this.y + 1 },
//     ];

//     return directions.filter(({ x, y }) => {
//       if (x < 0 || x >= board.size || y < 0 || y >= board.size) return false;

//       const cell = board.getCell(x, y);
//       const cellKey = `${x},${y}`;
//       return (
//         cell.type !== ECell.WALL && // Не стена
//         !this.visitedCells.has(cellKey) // Не посещённая ранее ячейка
//       );
//     });
//   }

//   move(board: Board) {
//     // Запоминаем текущую ячейку как посещённую
//     this.visitedCells.add(`${this.x},${this.y}`);

//     // Получаем доступные соседние ячейки
//     const neighbors = this.getNeighbors(board);

//     // Если доступных соседей нет, пытаемся двигаться в любое доступное направление
//     if (neighbors.length === 0) {
//       const randomDirection = this.getRandomDirection();
//       const newX = this.x + randomDirection.dx;
//       const newY = this.y + randomDirection.dy;

//       if (
//         newX >= 0 &&
//         newX < board.size &&
//         newY >= 0 &&
//         newY < board.size &&
//         board.getCell(newX, newY).type !== ECell.WALL
//       ) {
//         this.x = newX;
//         this.y = newY;
//       }

//       return;
//     }

//     // Двигаемся в случайную доступную соседнюю ячейку
//     const nextCell = neighbors[Math.floor(Math.random() * neighbors.length)];
//     this.x = nextCell.x;
//     this.y = nextCell.y;

//     // Если достигли точки `end`, логируем успех
//     const targetCell = board.getCell(this.x, this.y);
//     if (targetCell.type === ECell.END) {
//       console.log(`${this.name} нашёл точку END!`);
//     }
//   }
// }

export class Agent {
  x: number;
  y: number;
  name: string;
  genome: number[]; // Геном — массив направлений
  fitness: number; // Оценка
  goalX: number; // Координаты конца
  goalY: number;
  board: Board; // Ссылка на карту

  constructor(
    name: string,
    startX: number,
    startY: number,
    goalX: number,
    goalY: number,
    board: Board
  ) {
    this.x = startX;
    this.y = startY;
    this.name = name;
    this.genome = Array.from({ length: 10 }, () =>
      Math.floor(Math.random() * 4)
    ); // Случайный геном
    this.fitness = 0;
    this.goalX = goalX;
    this.goalY = goalY;
    this.board = board;
  }

  // Оценка агента (чем ближе к цели, тем выше оценка)
  calculateFitness() {
    const distance = Math.sqrt(
      (this.goalX - this.x) ** 2 + (this.goalY - this.y) ** 2
    );
    this.fitness = 1 / (distance + 1); // Чем ближе, тем больше значение
  }

  // Проверка, доступна ли клетка
  isValidMove(x: number, y: number): boolean {
    return this.board.isCellValid(x, y); // Проверка на валидность клетки
  }

  // Применить действие из генома
  move(step: number) {
    const action = this.genome[step];
    let newX = this.x;
    let newY = this.y;

    // Определяем новые координаты в зависимости от действия
    switch (action) {
      case 0:
        newY -= 1; // Вверх
        break;
      case 1:
        newY += 1; // Вниз
        break;
      case 2:
        newX -= 1; // Влево
        break;
      case 3:
        newX += 1; // Вправо
        break;
    }

    // Проверка доступности клетки
    if (this.isValidMove(newX, newY)) {
      this.x = newX;
      this.y = newY;
    }
  }
}
