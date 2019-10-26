import { UPDATE_TITLE, TURN_TITLE_GREEN } from '../actions';


const initialState = {
  title: "Title from the initial Redux store",
  titleColor: 'palevioletred'
}

const titleReducer = (state = initialState, action) => {
  console.log("reducer.js reducer action", action);

  switch (action.type) {
    case TURN_TITLE_GREEN: {
      return {
        ...state,
        titleColor: 'green'
      }
    }
    case UPDATE_TITLE: {
      return {
        ...state,
        title: action.payload
      }
    }
    default: return state;
  }
}

export default titleReducer;
