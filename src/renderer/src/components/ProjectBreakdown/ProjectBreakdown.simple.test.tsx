import { describe, expect, it } from 'vitest'
import { render, screen } from '../../utils/test'
import ProjectBreakdown from './ProjectBreakdown'

describe('ProjectBreakdown Simple Test', () => {
  it('renders with basic props', () => {
    render(<ProjectBreakdown title="Simple Test" />)

    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
      'Simple Test'
    )
    expect(screen.getByText('Sub Total')).toBeInTheDocument()
    expect(screen.getByText('0')).toBeInTheDocument()
  })
})
