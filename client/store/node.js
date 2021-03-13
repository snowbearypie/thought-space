import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_NODES = 'GET_NODES'
const ADD_NODE = 'ADD_NODE'

/**
 * INITIAL STATE
 */
const initialState = []

/**
 * ACTION CREATORS
 */
const _getNodes = nodes => ({type: GET_NODES, nodes})
const _addNode = node => ({type: ADD_NODE, node})

/**
 * THUNK CREATORS
 */
export const getNodes = () => async dispatch => {
  try {
    const res = await axios.get('/api/nodes')
    dispatch(_getNodes(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const addNode = node => async dispatch => {
  try {
    const res = await axios.post('/api/nodes', node)
    dispatch(_addNode(res.data))
    history.push('/nodes')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_NODES:
      return action.nodes
    case ADD_NODE:
      return [...state, action.node]
    default:
      return state
  }
}
