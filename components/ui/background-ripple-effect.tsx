"use client";
import React, { useMemo, useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export const BackgroundRippleEffect = ({
  rows = 8,
  cols = 27,
  cellSize = 56,
}: {
  rows?: number;
  cols?: number;
  cellSize?: number;
}) => {
  const [clickedCell, setClickedCell] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const [rippleKey, setRippleKey] = useState(0);
  const [hasInitialAnimated, setHasInitialAnimated] = useState(false);
  const ref = useRef<any>(null);

 useEffect(() => {
  // Keep the initial-animate class until all staggered initial animations finish.
  // For net-like effect with multiple origin points, we need to find the maximum
  // distance from any cell to its nearest origin point.
 // Generate random origin points for varied flow directions
const numPoints = 25; // Must match the numPoints in DivGrid
const originPoints = [];
for (let i = 0; i < numPoints; i++) {
  originPoints.push({
    row: Math.floor(Math.random() * rows),
    col: Math.floor(Math.random() * cols),
  });
}

  let maxMinDistance = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const minDistance = Math.min(
        ...originPoints.map(origin => Math.hypot(origin.row - r, origin.col - c))
      );
      maxMinDistance = Math.max(maxMinDistance, minDistance);
    }
  }

  const perCellDelay = 250; // matches DivGrid initialDelay multiplier
  const initialDuration = 3000; // matches DivGrid initialDuration
  const buffer = 120; // small safety buffer

  const totalTime = Math.ceil(maxMinDistance * perCellDelay) + initialDuration + buffer;

    const timer = setTimeout(() => {
      setHasInitialAnimated(true);
    }, totalTime);

    return () => clearTimeout(timer);
  }, [rows, cols]);

  return (
    <div
      ref={ref}
      className={cn(
        "absolute inset-0 h-full w-full",
        "md:top-40 lg:top-0",
        "[--cell-border-color:var(--color-neutral-300)] [--cell-fill-color:var(--color-neutral-100)] [--cell-shadow-color:var(--color-neutral-500)]",
        "dark:[--cell-border-color:var(--color-neutral-700)] dark:[--cell-fill-color:var(--color-neutral-900)] dark:[--cell-shadow-color:var(--color-neutral-800)]",
      )}
    >
      <div className="relative h-auto w-auto overflow-hidden">
        <div className="pointer-events-none absolute inset-0 z-[2] h-full w-full overflow-hidden" />
        <div className="relative" style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
          maskComposite: 'intersect',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
          WebkitMaskComposite: 'source-in'
        }}>
          <DivGrid
            key={`base-${rippleKey}`}
            className="mask-radial-from-20% mask-radial-at-top opacity-600"
            rows={rows}
            cols={cols}
            cellSize={cellSize}
            borderColor="var(--cell-border-color)"
            fillColor="var(--cell-fill-color)"
            clickedCell={clickedCell}
            hasInitialAnimated={hasInitialAnimated}
            onCellClick={(row, col) => {
              setClickedCell({ row, col });
              setRippleKey((k) => k + 1);
            }}
            interactive
          />
        </div>
      </div>
    </div>
  );
};

type DivGridProps = {
  className?: string;
  rows: number;
  cols: number;
  cellSize: number;
  borderColor: string;
  fillColor: string;
  clickedCell: { row: number; col: number } | null;
  hasInitialAnimated?: boolean;
  onCellClick?: (row: number, col: number) => void;
  interactive?: boolean;
};

type CellStyle = React.CSSProperties & {
  ["--delay"]?: string;
  ["--duration"]?: string;
  ["--initial-delay"]?: string;
};

const DivGrid = ({
  className,
  rows = 7,
  cols = 30,
  cellSize = 56,
  borderColor = "#3f3f46",
  fillColor = "rgba(14,165,233,0.3)",
  clickedCell = null,
  hasInitialAnimated = false,
  onCellClick = () => {},
  interactive = true,
}: DivGridProps) => {
  const cells = useMemo(
    () => Array.from({ length: rows * cols }, (_, idx) => idx),
    [rows, cols],
  );

  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
    gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
    width: cols * cellSize,
    height: rows * cellSize,
    marginInline: "auto",
  };

// Calculate multiple origin points for net-like effect
// Generate random origin points for varied flow directions
const originPoints = useMemo(() => {
  const numPoints = 25; // Increase this for more origin points
  const points = [];
  for (let i = 0; i < numPoints; i++) {
    points.push({
      row: Math.floor(Math.random() * rows),
      col: Math.floor(Math.random() * cols),
    });
  }
  return points;
}, [rows, cols]);

  return (
    <div className={cn("relative z-[3]", className)} style={gridStyle}>
      <style jsx>{`
  @keyframes borderFlow {
    0% {
      border-width: 0;
      border-color: transparent;
      opacity: 0;
      box-shadow: none;
    }
    30% {
      border-width: 0.5px;
      border-color: var(--flow-color);
      opacity: 1;
      box-shadow: 0 0 20px var(--flow-glow), inset 0 0 20px var(--flow-glow);
    }
    60% {
      border-width: 0.5px;
      border-color: var(--flow-color);
      opacity: 0.8;
      box-shadow: 0 0 15px var(--flow-glow);
    }
    100% {
      border-width: 0.5px;
      border-color: var(--final-border);
      opacity: 0.4;
      box-shadow: none;
    }
  }
  
  .initial-animate {
    animation: borderFlow var(--duration) ease-in-out var(--initial-delay) both;
  }
  
  .cell {
    background: linear-gradient(90deg, transparent 0%, var(--bg-color) 100%);
    background-size: 0% 100%;
    background-repeat: no-repeat;
  }
  
  .initial-animate {
    animation: borderFlow var(--duration) ease-in-out var(--initial-delay) both,
               fillCell var(--duration) ease-in-out var(--initial-delay) both;
  }
  
  @keyframes fillCell {
    0% {
      background-size: 0% 100%;
    }
    100% {
      background-size: 100% 100%;
    }
  }
`}</style>
      {cells.map((idx) => {
        const rowIdx = Math.floor(idx / cols);
        const colIdx = idx % cols;
        
        // For click ripple
        const distance = clickedCell
          ? Math.hypot(clickedCell.row - rowIdx, clickedCell.col - colIdx)
          : 0;
        const delay = clickedCell ? Math.max(0, distance * 55) : 0;
        const duration = 200 + distance * 80;

        // For initial load animation - find minimum distance to any origin point
        const initialDistance = Math.min(
          ...originPoints.map(origin => 
            Math.hypot(origin.row - rowIdx, origin.col - colIdx)
          )
        );
        const initialDelay = initialDistance * 250; // Stagger based on distance from center
        const initialDuration = 3000;

        const style: CellStyle = {
  ...(clickedCell && {
    "--delay": `${delay}ms`,
    "--duration": `${duration}ms`,
  }),
  ...(!hasInitialAnimated && {
    "--initial-delay": `${initialDelay}ms`,
    "--duration": `${initialDuration}ms`,
    "--flow-color": "#7A7FEE",
    "--flow-glow": "rgba(122, 127, 238, 0.6)",
    "--final-border": borderColor,
    "--bg-color": fillColor,
  }),
};

        return (
          <div
            key={idx}
            className={cn(
  "cell relative border-[0.5px] transition-all duration-300 will-change-transform hover:opacity-100 hover:scale-105 hover:bg-[#7A7FEE]/30 hover:border-[#7A7FEE] hover:shadow-[0px_0px_30px_2px_rgba(122,127,238,0.4)] dark:shadow-[0px_0px_40px_1px_var(--cell-shadow-color)_inset] dark:hover:shadow-[0px_0px_60px_3px_#7A7FEE_inset]",
  !hasInitialAnimated && "opacity-0 border-transparent initial-animate",
  hasInitialAnimated && "opacity-40",
  clickedCell && "animate-cell-ripple [animation-fill-mode:none]",
  !interactive && "pointer-events-none",
)}
            style={{
              backgroundColor: fillColor,
              borderColor: borderColor,
              ...style,
            }}
            onClick={
              interactive ? () => onCellClick?.(rowIdx, colIdx) : undefined
            }
          />
        );
      })}
    </div>
  );
};