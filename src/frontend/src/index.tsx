import React from 'react'
import ReactDOM from 'react-dom/client'
import RouteManager from './route/route'

import './styles/style.sass'

import '@fontsource/ibm-plex-sans-jp'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(<RouteManager />)

// reportWebVitals()
