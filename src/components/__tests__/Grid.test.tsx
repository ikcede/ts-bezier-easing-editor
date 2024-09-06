import { render, screen } from '@testing-library/react';
import Grid from '../Grid';

describe('Grid', () => {
  it('renders with default values', () => {
    render(
      <svg>
        <Grid />
      </svg>
    );
    expect(screen.getByTestId('grid')).toBeInTheDocument();

    const gridBase = screen.getByTestId('grid-base');
    expect(gridBase).toHaveAttribute('x', '0');
    expect(gridBase).toHaveAttribute('y', '0');
    expect(gridBase).toHaveAttribute('width', '300');
    expect(gridBase).toHaveAttribute('height', '300');
    expect(gridBase).toHaveAttribute('fill', 'rgb(40, 40, 46)');
    expect(gridBase).toHaveAttribute('stroke', 'rgb(0, 0, 0)');
    expect(gridBase).toHaveAttribute('stroke-width', '1px');

    const gridlines = screen.getByTestId('gridlines');
    expect(gridlines).toHaveAttribute('stroke', 'rgb(0, 0, 0)');
    expect(gridlines).toHaveAttribute('stroke-width', '1px');
    expect(gridlines.querySelectorAll('path')).toHaveLength(2);

    const halflines = screen.getByTestId('halflines');
    expect(halflines).toHaveAttribute('stroke', 'rgb(0, 0, 0)');
    expect(halflines).toHaveAttribute('stroke-width', '1px');
    expect(halflines.querySelectorAll('path')).toHaveLength(1);
  });

  it('does not render gridlines when showGridlines is false', () => {
    render(
      <svg>
        <Grid showGridlines={false} />
      </svg>
    );
    const gridlines = screen.queryByTestId('gridlines');
    expect(gridlines).not.toBeInTheDocument();
  });

  it('does not render halflines when showHalflines is false', () => {
    render(
      <svg>
        <Grid showHalflines={false} />
      </svg>
    );
    const halflines = screen.queryByTestId('halflines');
    expect(halflines).not.toBeInTheDocument();
  });
});
