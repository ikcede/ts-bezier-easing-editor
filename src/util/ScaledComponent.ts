import Scale from './Scale';

/** Interface for a component with x and y scales */
export default interface ScaledComponent {
  xScale: Scale,
  yScale: Scale,
};