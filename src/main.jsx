import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const root = createRoot(document.getElementById('root'));
//This renders what the App.jsx is returning so all display changes need to happen in said file
root.render(<App />)
