import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { PacmanLoader } from 'react-spinners'
import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Login from './pages/Login'
import { Providers } from './providers'

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
          <Route path="/" element={<Login />} />
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
      <App />
    </Providers>
  </React.StrictMode>
)
