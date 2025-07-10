import './assets/main.css'

import '@ant-design/v5-patch-for-react-19'
import { createRoot } from 'react-dom/client'
import App from './App'
import GlobalAppProvider from './components/AppProviders/GlobalAppProvider'


const rootElement: HTMLElement | null = document.getElementById('root')
if (!rootElement) {
  throw new Error('Failed to find the root element')
}
createRoot(rootElement).render(
  <GlobalAppProvider>
    <App />
  </GlobalAppProvider>
)
