import memoizeOne from 'memoize-one'

import SEARCH from './enumSearch'

const crAction = (dispatch) => ({
  loading: () => dispatch({
    type: SEARCH.LOADING
  }),
  loadingFailed: () => dispatch({
    type: SEARCH.LOADING_FAILED
  }),
  loaded: (options) => dispatch({
    type: SEARCH.LOADED, options
  }),

  setTicket: (ticket) => dispatch({
    type: SEARCH.SET_TICKET, ticket
  }),

  showOptions: () => dispatch({
    type: SEARCH.SHOW_OPTIONS
  }),
  hideOptions: () => dispatch({
    type: SEARCH.HIDE_OPTIONS
  }),
  toggleOptions: () => dispatch({
    type: SEARCH.TOGGLE_OPTIONS
  })
})

export default memoizeOne(crAction)
