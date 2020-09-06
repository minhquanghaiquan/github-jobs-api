import * as CONSTANTS from "./../constants/index";

const initialState ={
  loading: false,
  err: '',
  jobs: [],
  hasNextPage: false
};

const reducerData = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.FETCH_DATA:
      return {...state, loading: true , err: ''};
    case CONSTANTS.FETCH_DATA_SUCCESS:
      console.log(action.data)
      return {
        ...state,
        jobs: action.data,
        err: '',
        loading: false
      };
    case CONSTANTS.FETCH_DATA_FAILED:
      return {
        ...state,
        loading: false,
        err: action.err,
        jobs: []
      };
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
