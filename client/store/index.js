import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import hub from './hub'
import node from './node'
import singleHub from './singleHub'
import singleNode from './singleNode'

const reducer = combineReducers({
  user: user,
  hubs: hub,
  singleHub: singleHub,
  nodes: node,
  singleNode: singleNode
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
