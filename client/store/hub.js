import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_HUBS = 'GET_HUBS'
const ADD_HUB = 'ADD_HUB'
const DELETE_HUB = 'DELETE_HUB'
const UPDATE_HUB = 'UPDATE_HUB'

/**
 * INITIAL STATE
 */
const initialState = []

/**
 * ACTION CREATORS
 */
const _getHubs = hubs => ({type: GET_HUBS, hubs})
const _addHub = hub => ({type: ADD_HUB, hub})
const _deleteHub = hub => ({type: DELETE_HUB, hub})
const _updateHub = hub => ({type: UPDATE_HUB, hub})

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

export const deleteHub = hub => {
  return async dispatch => {
    await axios.delete(`/api/hubs/${hub.id}`)
    dispatch(deleteHub(hub))
    history.push('/hubs')
  }
}

export const updateHub = hub => {
  return async dispatch => {
    const {data} = await axios.put(`/api/hubs/${hub.id}`, hub)
    dispatch(_updateHub(data))
    history.push('/hubs')
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
    case DELETE_HUB:
      return state.filter(hub => hub.id !== action.hub.id)
    case UPDATE_HUB:
      return state.map(hub => {
        if (hub.id === action.hub.id) {
          hub = action.hub
        }
        return hub
      })
    default:
      return state
  }
}
