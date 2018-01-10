import React from 'react'
import { render } from 'react-dom'
import App from './components/App/App'

if ( performance.navigation.type === 1 && window.location.pathname !== '/' ) {
  location.replace( '/' )
}

render( <App />, document.getElementById( 'anchor' ) )
