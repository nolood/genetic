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
  stepCount,
}: {
  board: Board | null;
  agentSize: number;
  cellSize: number;
  agentCount: number;
  stepCount: number;
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

          if (newTick % stepCount === 0) {
            // Эволюция агентов, обновляем их геномы
            setAgents((prevAgents) => {
              const evolvedAgents = evolvePopulation(
                prevAgents,
                endCell.x,
                endCell.y,
                startCell.x,
                startCell.y,
                board
              );

              return evolvedAgents.map((agent) => {
                agent.x = startCell.x;
                agent.y = startCell.y;
                return agent;
              });
            });
          }

          setAgents((prevAgents) => {
            const movedAgents = prevAgents.map((agent) => {
              const step = newTick - 1;
              agent.move(step % stepCount);
              console.log(`Moving agent ${agent.name}:`, agent.x, agent.y);
              return agent;
            });

            return movedAgents;
          });

          return newTick;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [board]);

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
