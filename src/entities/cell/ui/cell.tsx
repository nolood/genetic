"use client";

import { twMerge } from "tailwind-merge";
import { Cell, ECell } from "../model/cell";

const CellTypeToColor = {
  [ECell.START]: "bg-red-500",
  [ECell.END]: "bg-green-500",
  [ECell.EMPTY]: "bg-white",
  [ECell.WALL]: "bg-gray-500",
};

const CellComponent = ({ cell, size }: { cell: Cell; size: number }) => {
  return (
    <div
      className={twMerge(`flex border bg-white`, CellTypeToColor[cell.type])}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    ></div>
  );
};

export default CellComponent;
