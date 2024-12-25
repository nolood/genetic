import { useState, useEffect } from "react";
import { evolvePopulation } from "~/entities/agent/lib/genetic-evolve";
import { Agent } from "~/entities/agent/model/agent";
import AgentComponent from "~/entities/agent/ui/agent";
import { Board } from "~/features/board/model/board";

const Game = ({
  board,
  agentSize,
  cellSize,
  agentCount,
}: {
  board: Board | null;
  agentSize: number;
  cellSize: number;
  agentCount: number;
}) => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [, setTick] = useState(0);

  useEffect(() => {
    if (board) {
      const startCell = board.getStartCell();
      const endCell = board.getEndCell();
      const initialAgents = Array.from(
        { length: agentCount },
        (_, i) =>
          new Agent(
            `${i}`,
            startCell.x,
            startCell.y,
            endCell.x,
            endCell.y,
            board
          )
      );
      setAgents(() => initialAgents);

      const interval = setInterval(() => {
        setTick((prev) => {
          const newTick = prev + 1;

          console.log("New tick:", newTick); // Для отладки

          if (newTick % 10 === 0) {
            // Эволюция агентов, обновляем их геномы
            setAgents((prevAgents) => {
              console.log("Evolving agents...");

              const evolvedAgents = evolvePopulation(
                prevAgents,
                endCell.x,
                endCell.y,
                startCell.x,
                startCell.y,
                board
              );

              // Лог для проверки новых агентов
              console.log("Evolved agents:", evolvedAgents);

              // После эволюции сбрасываем координаты на начальные
              return evolvedAgents.map((agent) => {
                agent.x = startCell.x;
                agent.y = startCell.y;
                return agent;
              });
            });
          }

          // Двигаем агентов в каждом тике
          setAgents((prevAgents) => {
            const movedAgents = prevAgents.map((agent) => {
              const step = newTick - 1;
              agent.move(step); // Двигаем агента на 1 шаг
              console.log(`Moving agent ${agent.name}:`, agent.x, agent.y);
              return agent;
            });

            // Лог после движения агентов
            console.log("Moved agents:", movedAgents);
            return movedAgents;
          });

          return newTick;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [board]);

  // console.log(agents);

  return (
    <>
      {agents.map((agent, index) => (
        <AgentComponent
          key={agent.name}
          agent={agent}
          cellSize={cellSize}
          size={agentSize}
          posCount={agents.reduce((acc, it) => {
            if (it.x === agent.x && it.y === agent.y) return acc + 1;
            return acc;
          }, 1)}
          index={index}
        />
      ))}
    </>
  );
};

export default Game;
