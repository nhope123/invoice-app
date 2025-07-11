import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Invoice from './Invoice';

describe('Invoice', () => {  
  it('renders Invoice', () => {
    const { getByText } = render(<Invoice />);

    expect(getByText('Invoice Component')).toBeInTheDocument();
  });
});
