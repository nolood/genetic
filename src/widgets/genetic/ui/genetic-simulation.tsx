"use client";

import React, { useEffect, useRef, useState } from "react";

type Individual = {
  x: number; // Позиция по X
  y: number; // Позиция по Y
  fitness: number; // Приспособленность (чем меньше расстояние до цели, тем лучше)
  vx: number; // Скорость по X
  vy: number; // Скорость по Y
};

const canvasWidth = 500;
const canvasHeight = 500;
const target = { x: 450, y: 450 };

const createIndividual = (): Individual => ({
  x: Math.random() * canvasWidth,
  y: Math.random() * canvasHeight,
  fitness: 0,
  vx: (Math.random() - 0.5) * 10,
  vy: (Math.random() - 0.5) * 10,
});

const GeneticSimulation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const populationRef = useRef<Individual[]>(
    Array.from({ length: 50 }, createIndividual)
  );

  const [, setPopulation] = useState<Individual[]>(populationRef.current);

  const calculateFitness = (individual: Individual) => {
    const dx = individual.x - target.x;
    const dy = individual.y - target.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const evolve = () => {
    const newPopulation = populationRef.current.map((ind) => ({
      ...ind,
      fitness: calculateFitness(ind),
    }));

    const best = newPopulation
      .sort((a, b) => a.fitness - b.fitness)
      .slice(0, 25);

    const offspring = Array.from({ length: 25 }, () => {
      const parent1 = best[Math.floor(Math.random() * best.length)];
      const parent2 = best[Math.floor(Math.random() * best.length)];
      return {
        x: Math.random() * canvasWidth,
        y: Math.random() * canvasHeight,
        fitness: 0,
        vx: (parent1.vx + parent2.vx) / 2 + (Math.random() - 0.5) * 2,
        vy: (parent1.vy + parent2.vy) / 2 + (Math.random() - 0.5) * 2,
      };
    });

    populationRef.current = [...best, ...offspring];
    setPopulation(populationRef.current);
  };

  const updateSimulation = () => {
    populationRef.current = populationRef.current.map((ind) => ({
      ...ind,
      x: Math.min(Math.max(ind.x + ind.vx, 0), canvasWidth),
      y: Math.min(Math.max(ind.y + ind.vy, 0), canvasHeight),
    }));
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx) return;

    const draw = () => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.fillStyle = "red";
      ctx.beginPath();
      ctx.arc(target.x, target.y, 10, 0, Math.PI * 2);
      ctx.fill();

      populationRef.current.forEach((ind) => {
        ctx.fillStyle = "blue";
        ctx.beginPath();
        ctx.arc(ind.x, ind.y, 5, 0, Math.PI * 2);
        ctx.fill();
      });

      updateSimulation();
      requestAnimationFrame(draw);
    };

    draw();
  }, []);

  useEffect(() => {
    const interval = setInterval(evolve, 1000);
    return () => clearInterval(interval);
  }, []);

  return <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} />;
};

export default GeneticSimulation;
