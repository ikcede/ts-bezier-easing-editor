import React from 'react';
import { range } from '../util';

interface GridProps {
  /** X position of the grid within its parent SVG */
  x?: number,

  /** Y position of the grid within its parent SVG */
  y?: number,

  /** Width of the grid in pixels */
  width?: number,

  /** Height of the grid in pixes */
  height?: number,

  /** Number of columns (col gridlines = cols - 1) */
  cols?: number,

  /** Number of rows (row gridlines = rows - 1) */
  rows?: number,

  /** Color of the background fill */
  backgroundColor?: string,

  /** Color of the gridlines and borders */
  gridColor?: string,

  /** Show or hide the gridlines */
  showGridlines?: boolean,

  /** Show or hide additional half gridlines */
  showHalflines?: boolean,
}

const Grid: React.FC<GridProps> = ({
  x = 0,
  y = 0,
  width = 300,
  height = 300,
  cols = 4,
  rows = 4,
  backgroundColor = 'rgb(40, 40, 46)',
  gridColor = 'rgb(0, 0, 0)',
  showGridlines = true,
  showHalflines = true,
}) => {

  const xStep = width / cols;
  const xPoints = range(x + xStep, x + width, xStep);

  const yStep = height / rows;
  const yPoints = range(y + yStep, y + height, yStep);

  const xLinesPath = xPoints
      .map(x => `M${x},${y} L${x},${y + height}`)
      .join(' ');

  const yLinesPath = yPoints
      .map(y => `M${x},${y} L${x + width},${y}`)
      .join(' ');

  const halfX = x + width / 2;
  const halfY = y + height / 2;
  const halflinesPath = 
      `M${halfX},${y} L${halfX},${y + height} ` +
      `M${x},${halfY} L${x + width},${halfY}`;

  return (
    <g>
      <rect x={x} 
            y={y}
            width={width}
            height={height}
            fill={backgroundColor}
            strokeWidth="1px"
            stroke={gridColor}>
      </rect>
      
      {/* Gridlines */}
      {showGridlines &&
        <g strokeWidth="1px" stroke={gridColor}>
          <path d={xLinesPath} />
          <path d={yLinesPath} />
        </g>
      }

      {/* Halflines */}
      {showHalflines &&
        <g strokeWidth="2px" stroke={gridColor}>
          <path d={halflinesPath} />
        </g>
      }
    </g>
  );
};

export default Grid;