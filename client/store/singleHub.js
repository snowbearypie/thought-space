import axios from 'axios'

//ACTION TYPE
const GET_SINGLE_HUB = 'GET_SINGLE_HUB'

//ACTION CREATER
const _fetchHub = hub => ({
  type: GET_SINGLE_HUB,
  hub
})

//THUNK CREATOR
export const fetchHub = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/hubs/${id}`)
      dispatch(_fetchHub(data))
    } catch (error) {
      console.log(error)
    }
  }
}

//INITIAL STATE
let initialState = {}

//REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SINGLE_HUB:
      return action.hub
    default:
      return state
  }
}
