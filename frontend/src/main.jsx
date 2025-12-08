import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Footer from './components/utils/footer.jsx'
import Nav from './components/utils/navbar.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Nav/>
    <App />
    <Footer/>
  </StrictMode>,
)
