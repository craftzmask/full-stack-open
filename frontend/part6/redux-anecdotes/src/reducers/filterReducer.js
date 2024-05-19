const reducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_FILTER': {
      return action.payload
    }
    default:
      return state
  }
}

export const filter = query => {
  return {
    type: 'SET_FILTER',
    payload: query
  }
}

export default reducer