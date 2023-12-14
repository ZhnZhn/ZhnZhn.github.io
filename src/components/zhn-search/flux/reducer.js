import {
  LOADING,
  LOADING_FAILED,
  LOADED,
  SET_TICKET,
  SHOW_OPTIONS,
  HIDE_OPTIONS,
  TOGGLE_OPTIONS
} from './actionTypes';

const reducer = (state, action) => {
  switch(action.type){
    case LOADING:
      return {
        ...state,
        isLoadingFailed: false,
        isLoading: true
      };
    case LOADING_FAILED:
      return {
        ...state,
        isLoading: false,
        isLoadingFailed: true
      };
    case LOADED:
      return {
        ...state,
        options: action.options,
        isOptions: true,
        isLoading: false
      };
    case SET_TICKET:
      return {
        ...state,
        ticket: action.ticket,
        isOptions: false
      };
    case SHOW_OPTIONS:
      return {
        ...state,
        isOptions: true
      };
    case HIDE_OPTIONS:
      return {
        ...state,
        isOptions: false,
        isLoadingFailed: false
      };
    case TOGGLE_OPTIONS:
      return {
         ...state,
         isOptions: !state.isOptions
      };
    default:
      throw new TypeError('Not existed action: ' + action.type)
  }
};

export default reducer
