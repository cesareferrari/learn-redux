import { UPDATE_TITLE } from '../actions';


const initialState = {
  title: "Title from the initial Redux store"
}

const reducer = (state = initialState, action) => {
  console.log("reducer.js reducer action", action);

  switch (action.type) {
    case UPDATE_TITLE: {
      return {
        ...state,
        title: action.payload
      }
    }
    default: return state;
  }
}

export default reducer;
