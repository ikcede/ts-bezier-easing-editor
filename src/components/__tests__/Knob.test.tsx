import React from 'react';
import { render } from '@testing-library/react';
import Knob from '../Knob';
import { CubicBezier, Scale } from '../../util';
import userEvent from '@testing-library/user-event';

describe('Knob', () => {
  const user = userEvent.setup();

  let xScale: Scale;
  let yScale: Scale;

  beforeEach(() => {
    xScale = new Scale(0, 1, 0, 200);
    yScale = new Scale(0, 1, 200, 0);
  });

  it('renders a line and two circles by default', () => {
    const { container } = render(
      <svg>
        <Knob xScale={xScale} yScale={yScale} />
      </svg>
    );
    expect(container.querySelectorAll('line').length).toBe(1);
    expect(container.querySelectorAll('circle').length).toBe(2);
  });

  it('applies default props correctly', () => {
    const { container } = render(
      <svg>
        <Knob xScale={xScale} yScale={yScale} />
      </svg>
    );
    const line = container.querySelector('line');
    const knob = container.querySelectorAll('circle')[1];
    expect(line!.getAttribute('stroke')).toEqual('rgb(230, 75, 61)');
    expect(line!.getAttribute('stroke-width')).toEqual('3');
    expect(knob!.getAttribute('fill')).toEqual('rgb(230, 75, 61)');
    expect(knob!.getAttribute('r')).toEqual('8');
  });

  it('applies custom colors and sizes', () => {
    const { container } = render(
      <svg>
        <Knob
          knobColor="red"
          knobRadius={10}
          tailColor="blue"
          tailWidth={5}
          xScale={xScale}
          yScale={yScale}
        />
      </svg>
    );
    const line = container.querySelector('line');
    const knob = container.querySelectorAll('circle')[1];
    expect(line?.getAttribute('stroke')).toEqual('blue');
    expect(line?.getAttribute('stroke-width')).toEqual('5');
    expect(knob?.getAttribute('fill')).toEqual('red');
    expect(knob?.getAttribute('r')).toEqual('10');
  });

  it('hides tail knob when showTailKnob is false', () => {
    const { container } = render(
      <svg>
        <Knob xScale={xScale} yScale={yScale} showTailKnob={false} />
      </svg>
    );
    expect(container.querySelectorAll('circle').length).toBe(1);
  });

  it('changes appearance on hover when useHover is true', async () => {
    const { container } = render(
      <svg>
        <Knob xScale={xScale} yScale={yScale} useHover />
      </svg>
    );
    const knob = container.querySelectorAll('circle')[1];
    await user.hover(knob);
    expect(knob!.getAttribute('r')).toEqual('10');
    await user.unhover(knob);
    expect(knob!.getAttribute('r')).toEqual('8');
  });

  it('does not change appearance on hover when useHover is false', async () => {
    const { container } = render(
      <svg>
        <Knob xScale={xScale} yScale={yScale} useHover={false} />
      </svg>
    );
    const knob = container.querySelectorAll('circle')[1];
    await user.hover(knob);
    expect(knob?.getAttribute('r')).toEqual('8');
  });

  it('calls onDown when knob is clicked', async () => {
    const onDown = jest.fn();
    const { container } = render(
      <svg>
        <Knob xScale={xScale} yScale={yScale} onDown={onDown} />
      </svg>
    );
    expect(onDown).toHaveBeenCalledTimes(0);
    const knob = container.querySelectorAll('circle')[1];
    await user.click(knob);
    expect(onDown).toHaveBeenCalled();
  });

  it('calls onDown when knob is touched', async () => {
    const onDown = jest.fn();
    const { container } = render(
      <svg>
        <Knob xScale={xScale} yScale={yScale} onDown={onDown} />
      </svg>
    );
    expect(onDown).toHaveBeenCalledTimes(0);
    const knob = container.querySelectorAll('circle')[1];
    await user.pointer({ target: knob, keys: '[TouchA]' });
    expect(onDown).toHaveBeenCalled();
  });

  it('shows highlight when down is true', () => {
    const { container } = render(
      <svg>
        <Knob xScale={xScale} yScale={yScale} down />
      </svg>
    );
    expect(container.querySelectorAll('circle').length).toBe(3);
  });

  it('uses custom scales', () => {
    const xScale = new Scale(0, 1, 0, 300);
    const yScale = new Scale(0, 1, 300, 0);
    const { container } = render(
      <svg>
        <Knob xScale={xScale} yScale={yScale} />
      </svg>
    );
    const line = container.querySelector('line');
    expect(line?.getAttribute('x1')).toEqual('0');
    expect(line?.getAttribute('y1')).toEqual('300');
    expect(line?.getAttribute('x2')).toEqual('75');
    expect(line?.getAttribute('y2')).toEqual('225');
  });
});
