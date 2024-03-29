import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { PacmanLoader } from 'react-spinners'
import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Roadmap from './pages/Roadmap'
import { Providers } from './providers'
import { ThemeProvider } from '@/components/theme-provider'
import NavBar from './components/Bars.tsx/NavBar'
import Landing from './pages/Landing'
import Activesprints from './pages/Activesprints'
import Report from './pages/Report'
import Issue from './pages/Issue'
import { Setup } from './pages/Setup'
import { SelectedProjectProvider } from './context/selectedProject'
import Link from './components/Link'

function App() {
  const [loading, setLoading] = useState(false)

  return (
    <Router>
      {loading ? (
        <div className="pacman-logo">
          <PacmanLoader color={'#1e3a8a'} loading={loading} size={30} />
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/Setup" element={<Setup />} />
          <Route path="/Roadmap" element={<Roadmap />} />
          <Route path="/Active-Sprints" element={<Activesprints />} />
          <Route path="/Reports" element={<Report />} />
          <Route path="/Issues" element={<Issue />} />
          <Route path="/NewLink" element={<Link />} />
        </Routes>
      )}
    </Router>
  )
}

// Use ReactDOM.createRoot to render the app
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Providers>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <SelectedProjectProvider>
          <NavBar />
          <App />
        </SelectedProjectProvider>
      </ThemeProvider>
    </Providers>
  </React.StrictMode>
)
