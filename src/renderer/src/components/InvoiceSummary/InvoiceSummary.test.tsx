import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import InvoiceSummary from './InvoiceSummary';

describe('InvoiceSummary', () => {  
  it('renders InvoiceSummary', () => {
    const { getByText } = render(<InvoiceSummary />);

    expect(getByText('InvoiceSummary Component')).toBeInTheDocument();
  });
});
