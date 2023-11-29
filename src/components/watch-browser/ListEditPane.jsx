//import PropTypes from "prop-types";
import {
  useRef,
  useState,
  useCallback,
  useMemo,
  getInputValue
} from '../uiApi';

import useInputText from './hooks/useInputText';

import A from './Atoms';
import { getRefFocusLast } from './paneFn';

const ListEditPane = (props) => {
  const {
    onRename,
    msgOnIsEmptyName,
    msgOnNotSelect,
    useMsEdit,
    getWatchGroups,
    getWatchListsByGroup,
    forActionType,
    onClose
  } = props
  , [
    groupOptions,
    setGroupOptions
  ] = useState(() => getWatchGroups())
  , [
    validationMessages,
    setValidationMessages
  ] = useState([])
  , _refSelectGroupList = useRef()
  , [
    _refInputText,
    _hClear
  ] = useInputText(setValidationMessages)
  /*eslint-disable react-hooks/exhaustive-deps */
  , _hRename = useCallback(()=>{
    const {
      captionGroup,
      captionList
    } = getInputValue(_refSelectGroupList) || {}
    , captionListTo = getInputValue(_refInputText);
    if (captionGroup && captionList && captionListTo){
      onRename({
        captionGroup,
        captionListFrom: captionList,
        captionListTo
      })
    } else {
      const msg = [];
      if (!captionGroup) { msg.push(msgOnNotSelect('Group')) }
      if (!captionList)  { msg.push(msgOnNotSelect('List From')) }
      if (!captionListTo){ msg.push(msgOnIsEmptyName('List To')) }
      setValidationMessages(msg)
    }
  },[])
  //onRename, msgOnNotSelect, msgOnIsEmptyName
  /*eslint-enable react-hooks/exhaustive-deps */

  , _primaryBt = useMemo(()=>(
    <A.Button.Primary
       caption="Edit"
       title="Edit List Name"
       onClick={_hRename}
    />
  ), [_hRename]);

  useMsEdit(msEdit => {
    if (msEdit) {            
      if (msEdit.forActionType === forActionType) {
        if (msEdit.messages) {
          setValidationMessages(msEdit.messages)
        } else {
          _hClear()
          setGroupOptions(getWatchGroups())
        }
      } else {
        setGroupOptions(getWatchGroups())
      }
    }
  })

  return (
    <div>
       <A.SelectGroupList
          ref={_refSelectGroupList}
          getWatchListsByGroup={getWatchListsByGroup}
          groupCaption="In Group:"
          groupOptions={groupOptions}
          listCaption="List From:"
       />
       <A.RowInputText
          ref={_refInputText}
          caption="List To:"
       />
       <A.ValidationMessages
          validationMessages={validationMessages}
       />
       <A.RowButtons
          refBtClose={getRefFocusLast(props)}
          Primary={_primaryBt}
          onClear={_hClear}
          onClose={onClose}
       />
    </div>
  );
}

/*
ListEditPane.propTypes = {
  getWatchGroups: PropTypes.func,
  getWatchListsByGroup: PropTypes.func,
  forActionType: PropTypes.string,
  useMsEdit: PropTypes.string,

  msgOnIsEmptyName: PropTypes.func,
  msgOnNotSelect: PropTypes.func,
  onRename: PropTypes.func,

  onClose: PropTypes.func
}
*/

export default ListEditPane
