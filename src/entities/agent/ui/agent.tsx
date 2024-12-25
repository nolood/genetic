import { motion } from "motion/react";
import { Agent } from "../model/agent";

const AgentComponent = ({
  agent,
  cellSize,
  size,
  posCount,
  index,
}: {
  agent: Agent;
  cellSize: number;
  posCount: number;
  size: number;
  index: number;
}) => {
  const x = agent.x;
  const y = agent.y;
  const cols = Math.ceil(Math.sqrt(posCount));

  const offsetX = (index % cols) * size;
  const offsetY = Math.floor(index / cols) * size;

  const centerOffset = (cellSize - size) / 3;
  return (
    <motion.div
      className="flex items-center justify-center rounded-full bg-blue-500 z-10"
      style={{
        position: "absolute",
        top: `${y * cellSize + centerOffset + offsetY}px`,
        left: `${x * cellSize + centerOffset + offsetX}px`,
        transform: "translate(-50%, -50%)",
        width: `${size}px`,
        height: `${size}px`,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <p className="text-white font-[12px]">{agent.name}</p>
    </motion.div>
  );
};

export default AgentComponent;
