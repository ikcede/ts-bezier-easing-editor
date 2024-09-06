import { render } from '@testing-library/react';
import BezierCurve from '../BezierCurve';
import { CubicBezier, Scale } from '../../util';

describe('BezierCurve', () => {
  let xScale: Scale;
  let yScale: Scale;

  beforeEach(() => {
    xScale = new Scale(0, 1, 0, 200);
    yScale = new Scale(0, 1, 200, 0);
  });

  it('renders a default props correctly', () => {
    const { container } = render(
      <svg>
        <BezierCurve xScale={xScale} yScale={yScale} />
      </svg>
    );
    const path = container.querySelector('path')!;
    expect(path).toHaveAttribute('stroke', 'rgb(255, 255, 255)');
    expect(path).toHaveAttribute('stroke-width', '3');
    expect(path).toHaveAttribute('fill', 'none');
    expect(path).toHaveAttribute('stroke-linecap', 'round');

    // A default curve should also be generated
    const dAttribute = path.getAttribute('d');
    expect(dAttribute).toContain('M0,200 C50,150 150,50 200,0');
  });

  it('applies custom color and width', () => {
    const { container } = render(
      <svg>
        <BezierCurve
          color="red"
          width={5}
          xScale={xScale}
          yScale={yScale}
        />
      </svg>
    );
    const path = container.querySelector('path')!;
    expect(path).toHaveAttribute('stroke', 'red');
    expect(path).toHaveAttribute('stroke-width', '5');
  });

  it('uses custom bezier curve', () => {
    const customBezier = new CubicBezier(0.1, 0.1, 0.9, 0.9);
    const { container } = render(
      <svg>
        <BezierCurve
          bezier={customBezier}
          xScale={xScale}
          yScale={yScale}
        />
      </svg>
    );
    const path = container.querySelector('path')!;
    const dAttribute = path.getAttribute('d');
    expect(dAttribute).toContain('M0,200 C20,180 180,20 200,0');
  });

  it('uses custom scales', () => {
    xScale = new Scale(0, 1, 0, 500);
    yScale = new Scale(0, 1, 500, 0);
    const { container } = render(
      <svg>
        <BezierCurve xScale={xScale} yScale={yScale} />
      </svg>
    );
    const path = container.querySelector('path')!;
    const dAttribute = path.getAttribute('d');
    expect(dAttribute).toContain('M0,500 C125,375 375,125 500,0');
  });
});
