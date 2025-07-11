// biome-ignore assist/source/organizeImports: <known issue>
import '@testing-library/jest-dom'
import { cleanup, render, type RenderOptions } from '@testing-library/react'
import type { ReactElement, ReactNode } from 'react'
import { afterEach, beforeAll } from 'vitest'

// Cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup()
})

// Setup global test environment
beforeAll(() => {
  // Mock window.matchMedia if needed
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => {}
    })
  })

  // Mock IntersectionObserver if needed
  global.IntersectionObserver = class MockIntersectionObserver {
    root = null
    rootMargin = ''
    thresholds: number[] = []
    disconnect() {}
    observe(_target: Element) {}
    unobserve(_target: Element) {}
    takeRecords(): IntersectionObserverEntry[] {
      return []
    }
  } as unknown as typeof IntersectionObserver

  // Mock ResizeObserver if needed
  global.ResizeObserver = class MockResizeObserver {
    disconnect() {}
    observe(_target: Element, _options?: ResizeObserverOptions) {}
    unobserve(_target: Element) {}
  } as unknown as typeof ResizeObserver
  // Mock electron APIs if needed
  global.electronAPI = {
    // Add mock electron API methods here if your components use them
  }
})

// Custom render function that includes providers
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  // Add any custom options here if needed
}

const AllTheProviders = ({ children }: { children: ReactNode }) => {
  // Add your app providers here, for example:
  // return (
  //   <ThemeProvider theme={theme}>
  //     <QueryClientProvider client={queryClient}>
  //       {children}
  //     </QueryClientProvider>
  //   </ThemeProvider>
  // )

  // For now, just return children directly
  return <>{children}</>
}

const customRender = (ui: ReactElement, options?: CustomRenderOptions) =>
  render(ui, { wrapper: AllTheProviders, ...options })

export { customRender as render }
