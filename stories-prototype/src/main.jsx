import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import StoriesAdmin from './stories_admin_prototype.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StoriesAdmin />
  </StrictMode>,
)
