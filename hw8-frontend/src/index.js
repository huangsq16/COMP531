require('./style.css')
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import Reducer from './reducers'
import App from './components/app'
import { LoggedChecking } from './components/auth/authActions'
const logger = createLogger()
const store = createStore(Reducer, applyMiddleware(thunkMiddleware,logger))
store.dispatch(LoggedChecking())
render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
)
