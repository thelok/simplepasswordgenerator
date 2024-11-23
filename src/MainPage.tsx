import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import './index.scss'
import { SiteLayout } from './site/SiteLayout'

/**
 * Main entry point of the application.
 * Renders the App component within the SiteLayout and StrictMode.
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SiteLayout>
      <App />
    </SiteLayout>
  </StrictMode>,
)
