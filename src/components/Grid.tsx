import { FC, memo } from 'react';
import { range } from '../util';

interface GridProps {
  /** X position of the grid's top-left within its parent SVG */
  x?: number;

  /** Y position of the grid's top-left within its parent SVG */
  y?: number;

  /** Width of the grid in pixels, default 300 */
  width?: number;

  /** Height of the grid in pixels, default 300 */
  height?: number;

  /** Number of columns in the grid. Default is 4. */
  cols?: number;

  /** Number of rows in the grid. Default is 4. */
  rows?: number;

  /** Color of the background fill, default: rgb(40, 40, 46) */
  backgroundColor?: string;

  /** Color of the gridlines and borders, defaults to white */
  gridColor?: string;

  /** Whether to show grid lines. Default is true. */
  showGridlines?: boolean;

  /** Whether to show half lines. Default is true. */
  showHalflines?: boolean;
}

/**
 * A customizable SVG grid
 *
 * @param props - GridProps
 * @returns An SVG group representing a grid
 */
const Grid: FC<GridProps> = ({
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
    .map((x) => `M${x},${y} L${x},${y + height}`)
    .join(' ');

  const yLinesPath = yPoints
    .map((y) => `M${x},${y} L${x + width},${y}`)
    .join(' ');

  const halfX = x + width / 2;
  const halfY = y + height / 2;
  const halflinesPath =
    `M${halfX},${y} L${halfX},${y + height} ` +
    `M${x},${halfY} L${x + width},${halfY}`;

  return (
    <g data-testid="grid">
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={backgroundColor}
        strokeWidth="1px"
        stroke={gridColor}
        data-testid="grid-base"
      ></rect>

      {/* Gridlines */}
      {showGridlines && (
        <g strokeWidth="1px" stroke={gridColor} data-testid="gridlines">
          <path d={xLinesPath} />
          <path d={yLinesPath} />
        </g>
      )}

      {/* Halflines */}
      {showHalflines && (
        <g strokeWidth="2px" stroke={gridColor} data-testid="halflines">
          <path d={halflinesPath} />
        </g>
      )}
    </g>
  );
};

export default memo(Grid);
