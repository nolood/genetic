import { motion } from "framer-motion";
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
  const cols = Math.ceil(Math.sqrt(posCount));

  const offsetX = (index % cols) * size;
  const offsetY = Math.floor(index / cols) * size;

  const centerOffset = (cellSize - size) / 3;

  const animatedPosition = {
    x: agent.x * cellSize + centerOffset + offsetX,
    y: agent.y * cellSize + centerOffset + offsetY,
  };

  return (
    <motion.div
      className="flex items-center justify-center rounded-full bg-blue-500 z-10"
      style={{
        position: "absolute",
        transform: "translate(-50%, -50%)",
        width: `${size}px`,
        height: `${size}px`,
      }}
      animate={{
        top: animatedPosition.y,
        left: animatedPosition.x,
      }}
      transition={{
        duration: 0.1,
        ease: "easeInOut",
      }}
    >
      <p className="text-white font-[12px]">{agent.name}</p>
    </motion.div>
  );
};

export default AgentComponent;
