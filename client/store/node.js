import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_NODES = 'GET_NODES'
const ADD_NODE = 'ADD_NODE'
const DELETE_NODE = 'DELETE_NODE'
const UPDATE_NODE = 'UPDATE_NODE'

/**
 * INITIAL STATE
 */
const initialState = []

/**
 * ACTION CREATORS
 */
const _getNodes = nodes => ({type: GET_NODES, nodes})
const _addNode = node => ({type: ADD_NODE, node})
const _deleteNode = node => ({type: DELETE_NODE, node})
const _updateNode = node => ({type: UPDATE_NODE, node})

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
    history.push(`/hubs/${node.hubId}`)
  } catch (err) {
    console.error(err)
  }
}

export const deleteNode = node => {
  return async dispatch => {
    await axios.delete(`/api/nodes/${node.id}`)
    dispatch(_deleteNode(node))
    history.push(`/hubs/${node.hubId}`)
  }
}

export const updateNode = node => {
  return async dispatch => {
    const {data} = await axios.put(`/api/nodes/${node.id}`, node)
    dispatch(_updateNode(data))
    history.push(`/hubs/${node.hubId}`)
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
    case DELETE_NODE:
      return state.filter(node => node.id !== action.node.id)
    case UPDATE_NODE:
      return state.map(node => {
        if (node.id === action.node.id) {
          node = action.node
        }
        return node
      })
    default:
      return state
  }
}
