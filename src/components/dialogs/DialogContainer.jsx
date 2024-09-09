import {
  bindTo,
  useCallback
} from '../uiApi';

import useStoreState from '../hooks/useStoreState'
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

const _onMdOption = (
  mdOption,
  setState,
  state
) => {
  if (mdOption) {
    const type = mdOption.modalDialogType;
    getModalDialog(state.inits[type] ? void 0 : type)
      .then(Comp => setState(prevState => {
         if (Comp) {
           prevState.dialogs.push({ type, Comp })
           prevState.inits[type] = true
         }
         return _setTypeTo(
           prevState,
           type,
           mdOption
         );
      }))
  }
};

const DialogContainer = () => {
  const [
    state,
    setState
  ] = useStoreState(() => ({
    isShow: false,
    inits: {},
    shows: {},
    data: {},
    dialogs: [],
    currentDialog: null
  }), useMdOption, _onMdOption)
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
  }, [setState]);

  return (
    <ModalDialogContainer
       isShow={isShow}
       onClose={bindTo(_hClose, currentDialog)}
    >
      {dialogs.map(({ type, Comp }) => (<Comp
           key={type}
           isShow={shows[type]}
           data={data[type]}
           onClose={bindTo(_hClose, type)}
        />
      ))}
    </ModalDialogContainer>
  );
};

export default DialogContainer
