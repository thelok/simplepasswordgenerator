import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import './index.scss'
import { SiteLayout } from './site/SiteLayout'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SiteLayout>
      <App />
    </SiteLayout>
  </StrictMode>,
)
