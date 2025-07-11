import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import PaymentTerms from './PaymentTerms';

describe('PaymentTerms', () => {  
  it('renders PaymentTerms', () => {
    const { getByText } = render(<PaymentTerms />);

    expect(getByText('PaymentTerms Component')).toBeInTheDocument();
  });
});
