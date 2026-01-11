import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <div style={{ color: 'white', padding: '20px', fontSize: '24px' }}>
            <h1>React is Running!</h1>
            <p>If you see this, the build and deployment are working.</p>
        </div>
    </React.StrictMode>,
)
