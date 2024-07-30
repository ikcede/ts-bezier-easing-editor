import React from 'react';
import { CubicBezier, Scale, ScaledComponent } from '../util';

interface BezierCurveProps extends ScaledComponent {
  /** Stroke color of the curve */
  color?: string,

  /** Stroke width in pixels */
  width?: number,

  /** CubicBezier controlling the underlying curve data */
  bezier?: CubicBezier,
}

/** 
 * Defines a bezier curve for CSS transitions
 * 
 * The curve is set to start at (0, 0) and end at (1, 1)
 * and can be scaled for display
 */
const BezierCurve: React.FC<BezierCurveProps> = ({
  color = 'rgb(255, 255, 255)',
  width = 3,
  bezier = new CubicBezier(.25, .25, .75, .75),

  // ScaledComponent default scales
  xScale = new Scale(0, 1, 0, 300),
  yScale = new Scale(0, 1, 300, 0),
}) => {

  // Set up start and end values scaled from (0, 0) and (1, 1)
  const startX = xScale.scale(0);
  const startY = yScale.scale(0);
  const endX = xScale.scale(1);
  const endY = yScale.scale(1);

  // Define scaled bezier points
  const scaledX1 = xScale.scale(bezier.x1);
  const scaledY1 = yScale.scale(bezier.y1);
  const scaledX2 = xScale.scale(bezier.x2);
  const scaledY2 = yScale.scale(bezier.y2);
  
  const pathD = `M${startX},${startY} `
      + `C${scaledX1},${scaledY1} `
      + `${scaledX2},${scaledY2} `
      + `${endX},${endY}`;

  return (
    <path
      fill="none"
      strokeLinecap="round"
      stroke={color}
      strokeWidth={width}
      d={pathD} />
  );
}

export default BezierCurve;