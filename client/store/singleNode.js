import axios from 'axios'

//ACTION TYPE
const GET_SINGLE_NODE = 'GET_SINGLE_NODE'

//ACTION CREATER
const _fetchNode = node => ({
  type: GET_SINGLE_NODE,
  node
})

//THUNK CREATOR
export const fetchNode = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/nodes/${id}`)
      dispatch(_fetchNode(data))
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
    case GET_SINGLE_NODE:
      return action.node
    default:
      return state
  }
}
