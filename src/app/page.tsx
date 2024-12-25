"use client";

import BoardComponent from "~/features/board/ui/board";

// import GeneticSimulation from "~/widgets/genetic/ui/genetic-simulation";

export default function Home() {
  return (
    <div className="flex p-10">
      {/* <GeneticSimulation /> */}
      <BoardComponent />
    </div>
  );
}
