import {
  bindTo,
  useState,
  useCallback,
  createElement
} from '../uiApi';

import { useMdOption } from '../../flux/stores/compStore';

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

const DialogContainer = () => {
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
    currentDialog,
    shows,
    data,
    dialogs
  } = state
  , _hClose = useCallback(type => {
     setState(prevState => {
       prevState.shows[type] = false
       prevState.isShow = false
       prevState.currentDialog = null
       return {...prevState};
     })
  }, []);

  useMdOption(mdOption => {
    if (mdOption) {
      const type = mdOption.modalDialogType
      , { inits } = state;

      getModalDialog(inits[type] ? void 0 : type)
        .then(comp => setState(prevState => {
            if (comp) {
              prevState.dialogs.push({ type, comp })
              prevState.inits[type] = true
            }
            return _setTypeTo(
              prevState,
              type,
              mdOption
            );
          })
        )
    }
  })

  return (
    <ModalDialogContainer
       isShow={isShow}
       onClose={bindTo(_hClose, currentDialog)}
    >
       {dialogs.map(({ type, comp }) => createElement(comp, {
          key: type,
          isShow: shows[type],
          data: data[type],
          onClose: bindTo(_hClose, type)
       }))}
    </ModalDialogContainer>
  );
};

export default DialogContainer
