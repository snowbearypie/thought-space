import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_NODES = 'GET_NODES'

/**
 * INITIAL STATE
 */
const initialState = []

/**
 * ACTION CREATORS
 */
const _getNodes = nodes => ({type: GET_NODES, nodes})

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

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_NODES:
      return action.nodes
    default:
      return state
  }
}
