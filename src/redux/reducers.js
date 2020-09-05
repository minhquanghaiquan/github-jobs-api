import * as CONSTANTS from "./../constants/index";

const initialState ={
  lists: [],
  hasNextPage: false
};

const reducerData = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.FETCH_DATA:
      return {...state};
    case CONSTANTS.FETCH_DATA_SUCCESS:
      console.log(action.data)
      return {
        ...state,
        lists: action.data
      };
    case CONSTANTS.FETCH_DATA_FAILED:
      return state;
    case CONSTANTS.CHECK_NEXT_PAGE:
      return {
        ...state,
        hasNextPage: action.hasNextPage
      }
     default:
        return state
  }
};

export default reducerData;
