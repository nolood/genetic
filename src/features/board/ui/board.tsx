"use client";

import { useEffect, useState } from "react";
import { Board } from "../model/board";
import CellComponent from "~/entities/cell/ui/cell";
import Game from "~/widgets/environment/ui/environment";

const BOARD_SIZE = 10;
const AGENT_COUNT = 5;
const CELL_SIZE = 100;
const AGENT_SIZE = 20;

const BoardComponent = () => {
  const [board, setBoard] = useState<Board | null>(null);
  useEffect(() => {
    const newBoard = new Board(BOARD_SIZE);

    setBoard(newBoard.init(AGENT_COUNT));
  }, []);

  // useEffect(() => {
  //   if (board) {
  //     const interval = setInterval(() => {
  //       board.updateAgents();
  //       setTick((prev) => prev + 1);
  //     }, 1000);

  //     return () => clearInterval(interval);
  //   }
  // }, [board]);

  if (!board) return null;

  return (
    <div className="w-max h-max relative">
      <Game
        board={board}
        agentCount={AGENT_COUNT}
        agentSize={AGENT_SIZE}
        cellSize={CELL_SIZE}
      />
      {/* {board.getAgents().map((agent, index) => (
        <AgentComponent
          agent={agent}
          key={agent.name}
          cellSize={CELL_SIZE}
          size={AGENT_SIZE}
          index={index}
          posCount={board.getAgents().reduce((acc, it) => {
            if (it.x === agent.x && it.y === agent.y) return acc + 1;
            return acc;
          }, 1)}
        />
      ))} */}
      {board.getMap().map((row, y) => (
        <div className="flex w-max h-max" key={y}>
          {row.map((cell, x) => (
            <CellComponent cell={cell} key={x} size={CELL_SIZE} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default BoardComponent;
