import React from 'react';
import { Grid, BezierCurve, Knob } from '.';
import { CubicBezier, Scale } from '../util';

export type BezierChangeFunction = (bezier?: CubicBezier) => void;

export interface BezierEditorProps {
  /////////// Editor props ///////////

  /** Width of the editor in pixels */
  width?: number;

  /** Height of the editor in pixels */
  height?: number;

  /** Uniform padding of the editor in pixels */
  padding?: number;

  /** If the editor is readonly (hides knobs) */
  readOnly?: boolean;

  /** CubicBezier for the editor to visualize */
  initialBezier?: CubicBezier;

  /** Controlled bezier value */
  bezier?: CubicBezier;

  /** Change event emitted on bezier updates */
  onChange?: BezierChangeFunction;

  /////////// Grid props ///////////

  /** Number of columns (col gridlines = cols - 1) */
  cols?: number;

  /** Number of rows (row gridlines = rows - 1) */
  rows?: number;

  /** Color of the background fill */
  gridBackgroundColor?: string;

  /** Color of the gridlines and borders */
  gridlineColor?: string;

  /** Show or hide the gridlines */
  showGridlines?: boolean;

  /** Show or hide additional half gridlines */
  showHalflines?: boolean;

  /////////// Knob props ///////////

  /** Default color of the knob */
  knobColor?: string;

  /** Default radius of the knob */
  knobRadius?: number;

  /** Color of the circle within the knob that appears on down */
  knobHighlightColor?: string;

  /** Default color of the line */
  tailColor?: string;

  /** Default stroke with of the line */
  tailWidth?: number;

  /** Whether or not to add an extra knob at the base */
  showTailKnob?: boolean;

  /** Color of the extra knob */
  tailKnobColor?: string;

  /** Radius of the extra knob */
  tailKnobRadius?: number;

  /** If the knob should apply hover effects */
  useHover?: boolean;

  /** Color of the knob when hovered or down */
  activeKnobColor?: string;

  /** Radius of the knob when hovered or down */
  activeKnobRadius?: number;

  /** Color of the line when hovered or down */
  activeTailColor?: string;

  /** Width of the line when hovered or down */
  activeTailWidth?: number;

  /////////// Curve props ///////////

  /** Stroke color of the curve */
  curveColor?: string;

  /** Stroke width in pixels */
  curveWidth?: number;
}

const BezierEditor: React.FC<BezierEditorProps> = ({
  /////////// Editor default props ///////////
  width = 500,
  height = 500,
  padding = 16,
  readOnly = false,
  initialBezier = new CubicBezier(0.25, 0.25, 0.75, 0.75),
  bezier,
  onChange = () => {},

  /////////// Grid default props ///////////
  cols = 4,
  rows = 4,
  gridBackgroundColor = 'rgb(40, 40, 46)',
  gridlineColor = 'rgb(0, 0, 0)',
  showGridlines = true,
  showHalflines = true,

  /////////// Knob default props ///////////
  knobColor = 'rgb(230, 75, 61)',
  knobRadius = 8,
  knobHighlightColor = 'rgb(255, 255, 255)',
  tailColor = 'rgb(230, 75, 61)',
  tailWidth = 3,
  showTailKnob = true,
  tailKnobColor = 'rgb(130, 130, 130)',
  tailKnobRadius = 8,

  useHover = true,
  activeKnobColor = 'rgb(230, 75, 61)',
  activeTailColor = 'rgb(230, 75, 61)',
  activeKnobRadius = 10,
  activeTailWidth = 5,

  /////////// Curve default props ///////////
  curveColor = 'rgb(255, 255, 255)',
  curveWidth = 3,
}) => {
  const [downKnob1, setDownKnob1] = React.useState(false);
  const [downKnob2, setDownKnob2] = React.useState(false);
  const [bezierValue, setBezierValue] = React.useState(
    bezier || initialBezier
  );

  const svgRef = React.createRef<SVGSVGElement>();

  const x = padding;
  const y = padding;
  const gridWidth = width - padding * 2;
  const gridHeight = height - padding * 2;

  const xScale = React.useMemo(
    () => new Scale(0, 1, x, x + gridWidth),
    [x, gridWidth]
  );

  const yScale = React.useMemo(
    () => new Scale(0, 1, y + gridHeight, y),
    [y, gridHeight]
  );

  const handleDownKnob1 = React.useCallback(() => {
    setDownKnob1(true);
  }, []);

  const handleDownKnob2 = React.useCallback(() => {
    setDownKnob2(true);
  }, []);

  // Calculate the x and y values of the mouse position
  // constrained to the SVG
  const calculatePosition = React.useCallback(
    (x: number, y: number) => {
      const rect = svgRef.current!.getBoundingClientRect();

      let calcX = x - rect.left;
      let calcY = y - rect.top;

      if (calcX < 0) {
        calcX = 0;
      } else if (calcX > width) {
        calcX = width;
      }

      if (calcY < 0) {
        calcY = 0;
      } else if (calcY > height) {
        calcY = height;
      }

      return [calcX, calcY];
    },
    [svgRef, height, width]
  );

  React.useEffect(() => {
    if (bezier !== undefined) {
      setBezierValue(bezier);
    }
  }, [bezier]);

  // Set up a window listener so that moving the mouse out
  // of the SVG doesn't stop the drag
  React.useEffect(() => {
    // Use one move handler for both mouse and touch events
    const handleMove = (event: UIEvent) => {
      let isValidMove = false;
      let xVal = 0;
      let yVal = 0;

      // Check if primary button is pressed for MouseEvents
      if (event instanceof MouseEvent && event.buttons === 1) {
        event.preventDefault();
        isValidMove = true;
        xVal = event.clientX;
        yVal = event.clientY;
      } else if (event instanceof TouchEvent) {
        isValidMove = true;
        let touch = event.touches[0] || event.changedTouches[0];
        xVal = touch.clientX;
        yVal = touch.clientY;
      }

      if (
        isValidMove &&
        (downKnob1 || downKnob2) &&
        svgRef.current !== null
      ) {
        const position = calculatePosition(xVal, yVal);

        let newBezier: CubicBezier;
        if (downKnob1) {
          newBezier = new CubicBezier(
            xScale.inverse(position[0]),
            yScale.inverse(position[1]),
            bezierValue.x2,
            bezierValue.y2
          );
        } else {
          newBezier = new CubicBezier(
            bezierValue.x1,
            bezierValue.y1,
            xScale.inverse(position[0]),
            yScale.inverse(position[1])
          );
        }

        setBezierValue(newBezier!);
        onChange(newBezier!);
      } else if (downKnob1 || downKnob2) {
        if (svgRef.current !== null) {
          setDownKnob1(false);
          setDownKnob2(false);
        }
      }
    };

    // Clear down when touch ends
    const handleTouchEnd = (event: TouchEvent) => {
      setDownKnob1(false);
      setDownKnob2(false);
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('touchmove', handleMove);
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('touchcancel', handleTouchEnd);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, [
    downKnob1,
    downKnob2,
    svgRef,
    bezierValue,
    calculatePosition,
    xScale,
    yScale,
    onChange,
  ]);

  /// Disables touch scrolling on the editor for better UX
  React.useEffect(() => {
    const handleTouchStart = (event: TouchEvent) => {
      event.preventDefault();
    };

    svgRef.current?.addEventListener('touchstart', handleTouchStart, {
      passive: false,
    });
  }, [svgRef.current]);

  const sharedKnobProps = {
    bezier: bezierValue,
    xScale: xScale,
    yScale: yScale,

    knobColor: knobColor,
    knobRadius: knobRadius,
    knobHighlightColor: knobHighlightColor,
    tailColor: tailColor,
    tailWidth: tailWidth,
    showTailKnob: showTailKnob,
    tailKnobColor: tailKnobColor,
    tailKnobRadius: tailKnobRadius,

    useHover: useHover,
    activeKnobColor: activeKnobColor,
    activeTailColor: activeTailColor,
    activeKnobRadius: activeKnobRadius,
    activeTailWidth: activeTailWidth,
  };

  return (
    <svg width={width} height={height} ref={svgRef}>
      <Grid
        x={x}
        y={y}
        width={gridWidth}
        height={gridHeight}
        cols={cols}
        rows={rows}
        backgroundColor={gridBackgroundColor}
        gridColor={gridlineColor}
        showGridlines={showGridlines}
        showHalflines={showHalflines}
      ></Grid>

      <BezierCurve
        bezier={bezierValue}
        xScale={xScale}
        yScale={yScale}
        color={curveColor}
        width={curveWidth}
      ></BezierCurve>

      {!readOnly && (
        <>
          <Knob
            {...sharedKnobProps}
            control={1}
            down={downKnob1}
            onDown={handleDownKnob1}
          ></Knob>
          <Knob
            {...sharedKnobProps}
            control={2}
            down={downKnob2}
            onDown={handleDownKnob2}
          ></Knob>
        </>
      )}
    </svg>
  );
};

export default BezierEditor;
