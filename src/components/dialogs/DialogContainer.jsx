import { useState, useCallback, createElement } from 'react';
//import PropTypes from "prop-types";

import useListen from '../hooks/useListen'

import ModalDialogContainer from '../zhn-containers/ModalDialogContainer';
import { ComponentActionTypes as CAT } from '../../flux/actions/ComponentActions';

import RouterModalDialog from './RouterModalDialog';

const _setTypeTo = (prevState, type, option) => {
    prevState.shows[type] = true
    prevState.data[type] = option
    prevState.isShow = true
    prevState.currentDialog = type
    return {...prevState};
};

const _renderDialogs = (
  store,
  { shows, data, dialogs },
  _handleClose
) => dialogs
  .map(({ type, comp }) => createElement(comp, {
     key: type,
     isShow: shows[type],
     data: data[type],
     store: store,
     onClose: _handleClose.bind(null, type)
}));


const DialogContainer = ({
  store
}) => {
  const [state, setState] = useState({
    isShow: false,
    inits: {},
    shows: {},
    data: {},
    dialogs: [],
    currentDialog: null
  })
  , _hClose = useCallback(type => {
     setState(prevState => {
       prevState.shows[type] = false
       prevState.isShow = false
       prevState.currentDialog = null
       return {...prevState};
     })
  }, [])

  useListen(store, (actionType, option) => {
    if (actionType === CAT.SHOW_MODAL_DIALOG){
      const type = option.modalDialogType
      , { inits } = state;

      if (inits[type]){
        Promise.resolve()
          .then( _ => {
            setState(prevState => _setTypeTo(
              prevState, type, option
            ))
          })
      } else {
        RouterModalDialog.getDialog(type)
          .then(comp => setState(prevState => {
              prevState.dialogs.push({ type, comp })
              prevState.inits[type] = true
              return _setTypeTo(
                prevState, type, option
              );
            })
          )
      }
    }
  })

  const { isShow, currentDialog } = state;

  return (
    <ModalDialogContainer
       isShow={isShow}
       onClose={_hClose.bind(null, currentDialog)}
    >
       {_renderDialogs(store, state, _hClose)}
   </ModalDialogContainer>
  );
}

/*
DialogContainer.propTypes = {
  store: PropTypes.shape({
    listen: PropTypes.func
  })
}
*/

export default DialogContainer
