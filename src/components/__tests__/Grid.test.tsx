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

    const gridlines = screen.getByTestId('gridlines');
    expect(gridlines.querySelectorAll('path')).toHaveLength(2);

    const halflines = screen.getByTestId('halflines');
    expect(halflines.querySelectorAll('path')).toHaveLength(2);
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
