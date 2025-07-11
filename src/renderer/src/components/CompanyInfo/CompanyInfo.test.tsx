import { describe, expect, it, render, screen } from '../../utils/test'
import CompanyInfo from './CompanyInfo'

const defaultProps = {
  name: 'Acme Corporation',
  street: '123 Main Street',
  city: 'New York',
  state: 'NY',
  zip: '10001',
  country: 'USA',
  phone: '+1 (555) 123-4567',
  email: 'contact@acme.com'
}

describe('CompanyInfo', () => {
  it('renders all company information correctly', () => {
    render(<CompanyInfo {...defaultProps} />)

    expect(screen.getByText('Acme Corporation')).toBeInTheDocument()
    expect(screen.getByText('123 Main Street')).toBeInTheDocument()
    expect(screen.getByText('New York, NY')).toBeInTheDocument()
    expect(screen.getByText('USA, 10001')).toBeInTheDocument()
    expect(screen.getByText('+1 (555) 123-4567')).toBeInTheDocument()
    expect(screen.getByText('contact@acme.com')).toBeInTheDocument()
  })

  it('renders company name as level 2 heading', () => {
    render(<CompanyInfo {...defaultProps} />)

    const heading = screen.getByRole('heading', { name: 'Acme Corporation' })
    expect(heading).toBeInTheDocument()
    expect(heading.tagName).toBe('H2')
  })

  it('formats city and state correctly', () => {
    const customProps = {
      ...defaultProps,
      city: 'Los Angeles',
      state: 'CA'
    }
    render(<CompanyInfo {...customProps} />)

    expect(screen.getByText('Los Angeles, CA')).toBeInTheDocument()
    expect(screen.queryByText('New York, NY')).not.toBeInTheDocument()
  })

  it('formats country and zip correctly', () => {
    const customProps = {
      ...defaultProps,
      country: 'Canada',
      zip: 'K1A 0A9'
    }
    render(<CompanyInfo {...customProps} />)

    expect(screen.getByText('Canada, K1A 0A9')).toBeInTheDocument()
    expect(screen.queryByText('USA, 10001')).not.toBeInTheDocument()
  })

  it('displays phone when provided', () => {
    render(<CompanyInfo {...defaultProps} />)

    expect(screen.getByText('+1 (555) 123-4567')).toBeInTheDocument()
  })

  it('displays email when provided', () => {
    render(<CompanyInfo {...defaultProps} />)

    expect(screen.getByText('contact@acme.com')).toBeInTheDocument()
  })

  it('handles empty phone gracefully', () => {
    const propsWithoutPhone = { ...defaultProps, phone: '' }
    render(<CompanyInfo {...propsWithoutPhone} />)

    expect(screen.getByText('Acme Corporation')).toBeInTheDocument()
    expect(screen.getByText('123 Main Street')).toBeInTheDocument()
    expect(screen.getByText('contact@acme.com')).toBeInTheDocument()
    // Phone should not be displayed when empty
    expect(screen.queryByText('+1 (555) 123-4567')).not.toBeInTheDocument()
  })

  it('handles empty email gracefully', () => {
    const propsWithoutEmail = { ...defaultProps, email: '' }
    render(<CompanyInfo {...propsWithoutEmail} />)

    expect(screen.getByText('Acme Corporation')).toBeInTheDocument()
    expect(screen.getByText('123 Main Street')).toBeInTheDocument()
    expect(screen.getByText('+1 (555) 123-4567')).toBeInTheDocument()
    // Email should not be displayed when empty
    expect(screen.queryByText('contact@acme.com')).not.toBeInTheDocument()
  })

  it('handles both phone and email being empty', () => {
    const propsWithoutContact = { ...defaultProps, phone: '', email: '' }
    render(<CompanyInfo {...propsWithoutContact} />)

    expect(screen.getByText('Acme Corporation')).toBeInTheDocument()
    expect(screen.getByText('123 Main Street')).toBeInTheDocument()
    expect(screen.getByText('New York, NY')).toBeInTheDocument()
    expect(screen.getByText('USA, 10001')).toBeInTheDocument()
    // Neither phone nor email should be displayed
    expect(screen.queryByText('+1 (555) 123-4567')).not.toBeInTheDocument()
    expect(screen.queryByText('contact@acme.com')).not.toBeInTheDocument()
  })

  it('renders different company information correctly', () => {
    const alternativeProps = {
      name: 'Tech Solutions Ltd',
      street: '456 Innovation Drive',
      city: 'San Francisco',
      state: 'CA',
      zip: '94105',
      country: 'USA',
      phone: '+1 (415) 555-0123',
      email: 'info@techsolutions.com'
    }
    render(<CompanyInfo {...alternativeProps} />)

    expect(screen.getByText('Tech Solutions Ltd')).toBeInTheDocument()
    expect(screen.getByText('456 Innovation Drive')).toBeInTheDocument()
    expect(screen.getByText('San Francisco, CA')).toBeInTheDocument()
    expect(screen.getByText('USA, 94105')).toBeInTheDocument()
    expect(screen.getByText('+1 (415) 555-0123')).toBeInTheDocument()
    expect(screen.getByText('info@techsolutions.com')).toBeInTheDocument()
  })

  it('handles international addresses correctly', () => {
    const internationalProps = {
      name: 'Global Enterprises',
      street: '789 International Boulevard',
      city: 'London',
      state: 'England',
      zip: 'SW1A 1AA',
      country: 'United Kingdom',
      phone: '+44 20 7946 0958',
      email: 'contact@global-enterprises.co.uk'
    }
    render(<CompanyInfo {...internationalProps} />)

    expect(screen.getByText('Global Enterprises')).toBeInTheDocument()
    expect(screen.getByText('789 International Boulevard')).toBeInTheDocument()
    expect(screen.getByText('London, England')).toBeInTheDocument()
    expect(screen.getByText('United Kingdom, SW1A 1AA')).toBeInTheDocument()
    expect(screen.getByText('+44 20 7946 0958')).toBeInTheDocument()
    expect(screen.getByText('contact@global-enterprises.co.uk')).toBeInTheDocument()
  })

  it('maintains proper component structure', () => {
    render(<CompanyInfo {...defaultProps} />)

    // Check that all required elements are present
    expect(screen.getByRole('heading', { name: 'Acme Corporation' })).toBeInTheDocument()
    expect(screen.getByText('123 Main Street')).toBeInTheDocument()
    expect(screen.getByText('New York, NY')).toBeInTheDocument()
    expect(screen.getByText('USA, 10001')).toBeInTheDocument()
    expect(screen.getByText('+1 (555) 123-4567')).toBeInTheDocument()
    expect(screen.getByText('contact@acme.com')).toBeInTheDocument()
  })
})
