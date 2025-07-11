import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import InvoiceSection from './InvoiceSection';

describe('InvoiceSection', () => {  
  it('renders InvoiceSection', () => {
    const { getByText } = render(<InvoiceSection />);

    expect(getByText('InvoiceSection Component')).toBeInTheDocument();
  });
});
