import SEARCH from './enumSearch'

const reducer = (state, action) => {
  switch(action.type){
    case SEARCH.LOADING:
      return {
        ...state,
        isLoadingFailed: false,
        isLoading: true
      };
    case SEARCH.LOADING_FAILED:
      return {
        ...state,
        isLoading: false,
        isLoadingFailed: true
      };
    case SEARCH.LOADED:
      return {
        ...state,
        options: action.options,
        isOptions: true,
        isLoading: false
      };
    case SEARCH.SET_TICKET:
      return {
        ...state,
        ticket: action.ticket,
        isOptions: false
      };
    case SEARCH.SHOW_OPTIONS:
      return {
        ...state,
        isOptions: true
      };
    case SEARCH.HIDE_OPTIONS:
      return {
        ...state,
        isOptions: false,
        isLoadingFailed: false
      };
    case SEARCH.TOGGLE_OPTIONS:
      return {
         ...state,
         isOptions: !state.isOptions
      };
    default:
      throw new TypeError('Not existed action: ' + action.type)
  }
};

export default reducer
