import React from 'react';
import { CubicBezier, Scale, ScaledComponent } from '../util';

export type KnobDownFunction = () => void;

interface KnobProps extends ScaledComponent {
  /** The bezier that this knob supports */
  bezier?: CubicBezier,

  /** Which beizer point the knob is based on */
  control?: 1 | 2,

  /** Default color of the knob */
  knobColor?: string,

  /** Default radius of the knob */
  knobRadius?: number,

  /** Color of the circle within the knob that appears on down */
  knobHighlightColor?: string,

  /** Default color of the line */
  tailColor?: string,

  /** Default stroke with of the line */
  tailWidth?: number,

  /** Whether or not to add an extra knob at the base */
  showTailKnob?: boolean,

  /** Color of the extra knob */
  tailKnobColor?: string,

  /** Radius of the extra knob */
  tailKnobRadius?: number,

  /** 
   * If the knob is pressed down or not
   * 
   * This is passed from editor to control how the knob is
   * being dragged
   */
  down?: boolean,

  /**
   * Notifies when a down event happens on the knob
   */
  onDown?: KnobDownFunction,

  /** If the knob should apply hover effects */
  useHover?: boolean,

  /** Color of the knob when hovered or down */
  activeKnobColor?: string,

  /** Radius of the knob when hovered or down */
  activeKnobRadius?: number,

  /** Color of the line when hovered or down */
  activeTailColor?: string,

  /** Width of the line when hovered or down */
  activeTailWidth?: number,
};

/**
 * A knob used to visualize and control one the two bezier points
 * 
 * The tail point starts at either (0, 0) for control = 1 or 
 * (1, 1) for control = 2
 */
const Knob: React.FC<KnobProps> = ({
  bezier = new CubicBezier(0.25, 0.25, 0.75, 0.75),
  control = 1,
  knobColor = 'rgb(230, 75, 61)',
  knobRadius = 8,
  knobHighlightColor = 'rgb(255, 255, 255)',
  tailColor = 'rgb(230, 75, 61)',
  tailWidth = 3,
  showTailKnob = true,
  tailKnobColor = 'rgb(130, 130, 130)',
  tailKnobRadius = 8,

  down = false,
  onDown = () => {},

  useHover = true,
  activeKnobColor = 'rgb(230, 75, 61)',
  activeTailColor = 'rgb(230, 75, 61)',
  activeKnobRadius = 10,
  activeTailWidth = 5,

  // ScaledComponent default scales
  xScale = new Scale(0, 1, 0, 300),
  yScale = new Scale(0, 1, 300, 0)
}) => {
  const [hover, setHover] = React.useState(false);
  const knobRef = React.createRef<SVGCircleElement>();

  const tailX = xScale.scale(control === 1 ? 0 : 1);
  const tailY = yScale.scale(control === 1 ? 0 : 1);
  const knobX = xScale.scale(
      control === 1 ? bezier.x1 : bezier.x2);
  const knobY = yScale.scale(
      control === 1 ? bezier.y1 : bezier.y2);

  const handleMouseEnter = (event: React.MouseEvent) => {
    setHover(true);
  }

  const handleMouseLeave = (event: React.MouseEvent) => {
    setHover(false);
  }

  const handleMouseDown = (event: React.MouseEvent) => {
    event.preventDefault();
    onDown();
  }

  // Manually set up the event listener to prevent scrolling
  React.useEffect(() => {
    const handleTouchStart = (event: TouchEvent) => {
      event.preventDefault();
      event.stopPropagation();
      onDown();
    }

    knobRef.current!.addEventListener(
        'touchstart', handleTouchStart, {passive: false});
  }, [knobRef, onDown]);

  return (
    <g>
      <line
        stroke={(hover || down) ? activeTailColor : tailColor}
        strokeLinecap="round"
        strokeWidth={(hover || down) ? activeTailWidth : tailWidth}
        x1={tailX}
        y1={tailY}
        x2={knobX}
        y2={knobY} />

      {showTailKnob && 
        <circle
          cx={tailX}
          cy={tailY}
          r={tailKnobRadius}
          stroke='none'
          fill={tailKnobColor} />
      }
      
      <circle
        cx={knobX}
        cy={knobY}
        r={(hover || down) ? activeKnobRadius : knobRadius}
        stroke='none'
        fill={(hover || down) ? activeKnobColor : knobColor}
        ref={knobRef}
        onMouseDown={handleMouseDown} 
        onMouseEnter={useHover ? handleMouseEnter : undefined}
        onMouseLeave={useHover ? handleMouseLeave : undefined}
        />
      
      {down &&
        <circle
          cx={knobX}
          cy={knobY}
          r={Math.max(activeKnobRadius - 5, 1)}
          stroke='none'
          fill={knobHighlightColor} />
      }
    </g>
  );
};

export default Knob;