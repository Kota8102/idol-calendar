import React from 'react'
import ReactDOM from 'react-dom/client'
import reportWebVitals from './utils/reportWebVitals'

import './styles/style.sass'
import RouteManager from './route/route'

import '@fontsource/ibm-plex-sans-jp'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(<RouteManager />)

reportWebVitals()
