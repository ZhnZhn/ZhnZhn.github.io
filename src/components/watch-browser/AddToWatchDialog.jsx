//import PropTypes from "prop-types";
import {
  useState,
  useCallback,
  useEffect
} from '../uiApi';

import memoIsShow from '../hoc/memoIsShow';
import usePrevValue from '../hooks/usePrevValue';
import useProperty from '../hooks/useProperty';
import useListen from '../hooks/useListen';

import {
  WAT_EDIT_WATCH_COMPLETED,
  WAT_EDIT_WATCH_FAILED,
  WAT_ADD_ITEM,
  WatchActions
} from '../../flux/actions/WatchActions';
import {
  notSelected
} from '../../constants/MsgWatch';

import ModalDialog from '../zhn-moleculs/ModalDialog';
import Button from './Button';
import ValidationMessages from '../zhn/ValidationMessages';
import D from '../dialogs/DialogCell'

const addItem = WatchActions[WAT_ADD_ITEM]
, S_DIALOG = { width: 300 }
, S_CAPTION = { width: 70 }
, SELECT_WIDTH = "202";

const AddToWatchDialog = memoIsShow((
  props
) => {
  const [
    setGroupCaption,
    getGroupCaption
  ] = useProperty(null)
  , [
    setListCaption,
    getListCaption
  ] = useProperty(null)
  , _prevProps = usePrevValue(props)
  , {
    isShow,
    store,
    data,
    onClose
  } = props
  , [
    validationMessages,
    setValidationMessages
  ] = useState([])
  , [
    state,
    setState
  ] = useState(() => ({
    groupOptions: store.getWatchGroups(),
    listOptions: []
  }))
  , {
    groupOptions,
    listOptions
  } = state

  /*eslint-disable react-hooks/exhaustive-deps */
  , _hSelectGroup = useCallback((group) => {
    const {
      caption,
      lists
    } = group || {};
    if (caption){
       setGroupCaption(caption)
       setState(prevState => ({
         ...prevState,
         listOptions: lists || []
       }))
    } else {
      setGroupCaption(null)
    }
  }, [])
  //setGroupCaption
  /*eslint-enable react-hooks/exhaustive-deps */

  /*eslint-disable react-hooks/exhaustive-deps */
  , _hSelectList = useCallback((list) => {
      const { caption } = list || {}
      setListCaption(caption || null)
  }, [])
  //setListCaption
  /*eslint-enable react-hooks/exhaustive-deps */

  , _getValidationMessages = () => {
    const msg = [];
    if (!getGroupCaption())  {
      msg.push(notSelected('Group'))
    }
    if (!getListCaption()) {
      msg.push(notSelected('List'))
    }
    return msg;
  }
  , _hAdd = () => {
    const _vms = _getValidationMessages();
    if (_vms.length === 0){
      const {
        caption,
        config
      } = data
      , groupCaption = getGroupCaption()
      , listCaption = getListCaption();
      addItem({
        caption,
        groupCaption,
        listCaption,
        config
      })
      setValidationMessages(
        prevVms => prevVms.length > 0
          ? []
          : prevVms
      )
    } else {
      setValidationMessages(_vms)
    }
  }
  , _commandButtons = [
     <Button.Flat
       key="add"
       caption="Add"
       title="Add Item To Watch List"
       isPrimary={true}
       onClick={_hAdd}
      />
  ]
  , _hClose = useCallback(() => {
    setValidationMessages(
      prevVms => prevVms.length > 0
        ? []
        : prevVms
    )
    onClose()
  }, [onClose]);


  useListen((actionType, data) => {
    if (actionType === WAT_EDIT_WATCH_COMPLETED && data.forActionType === WAT_ADD_ITEM){
       setValidationMessages(
         prevVms => prevVms.length>0
           ? []
           : prevVms
       )
       onClose()
    } else if (actionType === WAT_EDIT_WATCH_FAILED && data.forActionType === WAT_ADD_ITEM){
       setValidationMessages(data.messages)
    }
  })

  /*eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (_prevProps && _prevProps !== props && _prevProps.isShow !== isShow) {
      const groups = store.getWatchGroups()
      , _groupCaption = getGroupCaption()
      if (groups !== groupOptions){
        setGroupCaption(null)
        setListCaption(null)
        setState({
          groupOptions: groups,
          listOptions: []
        })
      } else if (_groupCaption){
        setState(prevState => {
          const _listOptions = store.getWatchListsByGroup(_groupCaption)
          return listOptions !== _listOptions
            ? (setListCaption(null), {...prevState, listOptions: _listOptions})
            : prevState;
        })
      }
    }
  })
  //_prevProps, props, isShow, store
  //getGroupCaption, setGroupCaption, setListCaption
  //groupOptions, listOptions
  /*eslint-enable react-hooks/exhaustive-deps */

  const {
    caption
  } = data;

  return (
    <ModalDialog
       style={S_DIALOG}
       caption="Add To Watch List"
       isShow={isShow}
       commandButtons={_commandButtons}
       onClose={_hClose}
    >
      <D.RowText
        captionStyle={S_CAPTION}
        caption="Item:"
        text={caption}
      />
      <D.RowInputSelect
        caption="Group"
        captionStyle={S_CAPTION}
        width={SELECT_WIDTH}
        options={groupOptions}
        onSelect={_hSelectGroup}
      />
      <D.RowInputSelect
        caption="List"
        captionStyle={S_CAPTION}
        width={SELECT_WIDTH}
        onSelect={_hSelectList}
        options={listOptions}
      />
      <ValidationMessages
         validationMessages={validationMessages}
       />
    </ModalDialog>
  );
});

/*
AddToWatchDialog.propTypes = {
  isShow  : PropTypes.bool,
  data    : PropTypes.object,
  store   : PropTypes.shape({
    listen: PropTypes.func,
    getWatchGroups: PropTypes.func,
    getWatchListsByGroup: PropTypes.func
  }),
  onClose : PropTypes.func
}
*/

export default AddToWatchDialog
