import memoizeOne from 'memoize-one'

import {
  LOADING,
  LOADING_FAILED,
  LOADED,
  SET_TICKET,
  SHOW_OPTIONS,
  HIDE_OPTIONS,
  TOGGLE_OPTIONS
} from './actionTypes';

const crAction = (dispatch) => ({
  loading: () => dispatch({
    type: LOADING
  }),
  loadingFailed: () => dispatch({
    type: LOADING_FAILED
  }),
  loaded: (options) => dispatch({
    type: LOADED, options
  }),

  setTicket: (ticket) => dispatch({
    type: SET_TICKET, ticket
  }),

  showOptions: () => dispatch({
    type: SHOW_OPTIONS
  }),
  hideOptions: () => dispatch({
    type: HIDE_OPTIONS
  }),
  toggleOptions: () => dispatch({
    type: TOGGLE_OPTIONS
  })
})

export default memoizeOne(crAction)
