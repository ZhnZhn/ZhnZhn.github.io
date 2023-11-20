import {
  bindTo,
  useState,
  useCallback,
  createElement
} from '../uiApi';

import useListen from '../hooks/useListen';

import {
  CAT_SHOW_MODAL_DIALOG
} from '../../flux/actions/ComponentActions';
import ModalDialogContainer from '../zhn-containers/ModalDialogContainer';
import { getModalDialog } from './RouterModalDialog';

const _setTypeTo = (
  prevState,
  type,
  option
) => {
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
     onClose: bindTo(_handleClose, type)
}));


const DialogContainer = ({
  store
}) => {
  const [
    state,
    setState
  ] = useState({
    isShow: false,
    inits: {},
    shows: {},
    data: {},
    dialogs: [],
    currentDialog: null
  })
  , {
    isShow,
    currentDialog
  } = state
  , _hClose = useCallback(type => {
     setState(prevState => {
       prevState.shows[type] = false
       prevState.isShow = false
       prevState.currentDialog = null
       return {...prevState};
     })
  }, [])

  useListen((actionType, option) => {
    if (actionType === CAT_SHOW_MODAL_DIALOG){
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
        getModalDialog(type)
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
  });

  return (
    <ModalDialogContainer
       isShow={isShow}
       onClose={bindTo(_hClose, currentDialog)}
    >
       {_renderDialogs(store, state, _hClose)}
   </ModalDialogContainer>
  );
};

export default DialogContainer
