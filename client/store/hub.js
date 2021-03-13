import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_HUBS = 'GET_HUBS'
const ADD_HUB = 'ADD_HUB'

/**
 * INITIAL STATE
 */
const initialState = []

/**
 * ACTION CREATORS
 */
const _getHubs = hubs => ({type: GET_HUBS, hubs})
const _addHub = hub => ({type: ADD_HUB, hub})

/**
 * THUNK CREATORS
 */
export const getHubs = () => async dispatch => {
  try {
    const res = await axios.get('/api/hubs')
    dispatch(_getHubs(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const addHub = hub => async dispatch => {
  try {
    const res = await axios.post('/api/hubs', hub)
    dispatch(_addHub(res.data))
    history.push('/hubs')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_HUBS:
      return action.hubs
    case ADD_HUB:
      return [...state, action.hub]
    default:
      return state
  }
}
