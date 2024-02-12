//import PropTypes from "prop-types";
import {
  useState,
  useCallback,
  useEffect
} from '../uiApi';

import memoIsShow from '../hoc/memoIsShow';
import useHasBeenOpen from '../hooks/useHasBeenOpen';
import useProperty from '../hooks/useProperty';

import {
  WAT_ADD_ITEM
} from '../../flux/actions/WatchActions';
import {
  useMsEdit,
  getWatchGroups,
  getWatchListsByGroup,
  addWatchItem
} from '../../flux/watch-list/watchListStore';

import {
  notSelected
} from '../../constants/MsgWatch';

import ModalDialog from '../zhn-moleculs/ModalDialog';
import Button from './Button';
import ValidationMessages from '../zhn/ValidationMessages';
import D from '../dialogs/DialogCell';

const S_DIALOG = { width: 300 }
, S_CAPTION = { width: 70 }
, SELECT_WIDTH = "202";

const AddToWatchDialog = memoIsShow(({
  isShow,
  data,
  onClose
}) => {
  const _hasBeenOpen = useHasBeenOpen(isShow)
  , [
    setGroupCaption,
    getGroupCaption
  ] = useProperty(null)
  , [
    setListCaption,
    getListCaption
  ] = useProperty(null)
  , [
    validationMessages,
    setValidationMessages
  ] = useState([])
  , [
    state,
    setState
  ] = useState(() => ({
    groupOptions: getWatchGroups(),
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
      addWatchItem({
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

  useMsEdit(msEdit => {
    if (msEdit && msEdit.forActionType === WAT_ADD_ITEM) {
      if (msEdit.messages) {
        setValidationMessages(msEdit.messages)
      } else {
        setValidationMessages(
          prevVms => prevVms.length>0
            ? []
            : prevVms
        )
        onClose()
      }
    }
  })

  /*eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (_hasBeenOpen) {
      const groups = getWatchGroups()
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
          const _listOptions = getWatchListsByGroup(_groupCaption)
          return listOptions !== _listOptions
            ? (setListCaption(null), {...prevState, listOptions: _listOptions})
            : prevState;
        })
      }
    }
  }, [_hasBeenOpen])
  //getGroupCaption, setGroupCaption, setListCaption
  //groupOptions, listOptions
  /*eslint-enable react-hooks/exhaustive-deps */

  const {
    caption
  } = data || {};

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

export default AddToWatchDialog
