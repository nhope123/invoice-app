import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import CompanyInfo from './CompanyInfo';

describe('CompanyInfo', () => {  
  it('renders CompanyInfo', () => {
    const { getByText } = render(<CompanyInfo />);

    expect(getByText('CompanyInfo Component')).toBeInTheDocument();
  });
});
