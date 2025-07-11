import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ClientCard from './ClientCard';

describe('ClientCard', () => {  
  it('renders ClientCard', () => {
    const { getByText } = render(<ClientCard />);

    expect(getByText('ClientCard Component')).toBeInTheDocument();
  });
});
