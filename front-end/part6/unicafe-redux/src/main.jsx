import React from 'react'
import ReactDOM from 'react-dom/client'

import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }

  const action = {
    good() {
      store.dispatch({ type: 'GOOD' })
    },
    ok() {
      store.dispatch({ type: 'OK' })
    },
    bad() {
      store.dispatch({ type: 'BAD' })
    },
    reset() {
      store.dispatch({ type: 'ZERO' })
    }
  }

  return (
    <div>
      <button onClick={action.good}>good</button> 
      <button onClick={action.ok}>ok</button> 
      <button onClick={action.bad}>bad</button>
      <button onClick={action.reset}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
