import { FC } from 'react';
import { CubicBezier, Scale, ScaledComponent } from '../util';

interface BezierCurveProps extends ScaledComponent {
  /** Stroke color of the curve */
  color?: string;

  /** Stroke width in pixels */
  width?: number;

  /** CubicBezier controlling the underlying curve data */
  bezier?: CubicBezier;
}

/**
 * Renders a cubic Bezier curve using SVG path.
 *
 * The curve is defined to start at (0, 0) and end at (1, 1) in
 * its own coordinate system, which is then scaled to the desired
 * display size. The curve's shape is controlled by two additional
 * control points defined in the CubicBezier object.
 *
 * @component
 * @example
 * ```jsx
 * <BezierCurve
 *   color="red"
 *   width={2}
 *   bezier={new CubicBezier(0.4, 0, 0.6, 1)}
 *   xScale={new Scale(0, 1, 0, 200)}
 *   yScale={new Scale(0, 1, 200, 0)}
 * />
 * ```
 */
const BezierCurve: FC<BezierCurveProps> = ({
  color = 'rgb(255, 255, 255)',
  width = 3,
  bezier = new CubicBezier(0.25, 0.25, 0.75, 0.75),

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

  // Construct the SVG path data string
  const pathD =
    `M${startX},${startY} ` +
    `C${scaledX1},${scaledY1} ` +
    `${scaledX2},${scaledY2} ` +
    `${endX},${endY}`;

  return (
    <path
      fill="none"
      strokeLinecap="round"
      stroke={color}
      strokeWidth={width}
      d={pathD}
    />
  );
};

export default BezierCurve;
