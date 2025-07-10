import { ConfigProvider } from 'antd'
import { type FC, StrictMode } from 'react'
import theme from './theme'
import type { GlobalAppProviderProps } from './types.ts'

const GlobalAppProvider: FC<GlobalAppProviderProps> = ({ children }) => {
  return (
    <StrictMode>
      <ConfigProvider theme={theme}>{children}</ConfigProvider>
    </StrictMode>
  )
}

export default GlobalAppProvider
