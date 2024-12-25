import { Board } from "~/features/board/model/board";
import { Agent } from "../model/agent";

export function evolvePopulation(
  agents: Agent[],
  goalX: number,
  goalY: number,
  startX: number,
  startY: number,
  board: Board
): Agent[] {
  // 1. Рассчитать fitness для каждого агента
  agents.forEach((agent) => agent.calculateFitness());

  // 2. Отсортировать по fitness (чем выше, тем лучше)
  agents.sort((a, b) => b.fitness - a.fitness);

  // 3. Сохранить лучших агентов
  const topAgents = agents.slice(0, Math.ceil(agents.length / 2));

  console.log(agents);

  // 4. Кроссовер: создавать новых агентов
  const newAgents: Agent[] = [];
  while (newAgents.length < agents.length) {
    const parent1 = topAgents[Math.floor(Math.random() * topAgents.length)];
    const parent2 = topAgents[Math.floor(Math.random() * topAgents.length)];

    const childGenome = parent1.genome.map(
      (gene, i) => (Math.random() > 0.5 ? gene : parent2.genome[i]) // Половина генов от каждого
    );

    const child = new Agent(
      `${newAgents.length}`,
      startX,
      startY,
      goalX,
      goalY,
      board
    );
    child.genome = childGenome;

    // Мутация (изменение случайного гена)
    if (Math.random() < 0.1) {
      child.genome[Math.floor(Math.random() * childGenome.length)] = Math.floor(
        Math.random() * 4
      );
    }

    newAgents.push(child);
  }

  return newAgents;
}
