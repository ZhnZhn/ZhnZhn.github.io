//import PropTypes from "prop-types";
import {
  useRef,
  getInputValue
} from '../uiApi';

import useValidationMessages from './hooks/useValidationMessages';
import useGroupOptions from './hooks/useGroupOptions';

import A from './Atoms';
import { getRefFocusLast } from './paneFn';

const ListEditPane = (props) => {
  const {
    onRename,
    msgOnIsEmptyName,
    msgOnNotSelect,
    getWatchListsByGroup,
    onClose
  } = props
  , _refSelectGroupList = useRef()
  , [
    validationMessages,
    setValidationMessages,
    _hClear,
    _refInputText
  ] = useValidationMessages()
  , groupOptions = useGroupOptions(
    props,
    setValidationMessages,
    _hClear
  )
  /*eslint-disable react-hooks/exhaustive-deps */
  , _hRename = () => {
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
  };

  return (
    <div>
       <A.SelectGroupList
          refEl={_refSelectGroupList}
          getWatchListsByGroup={getWatchListsByGroup}
          groupCaption="In Group:"
          groupOptions={groupOptions}
          listCaption="List From:"
       />
       <A.RowInputText
          refEl={_refInputText}
          caption="List To:"
       />
       <A.ValidationMessages
          validationMessages={validationMessages}
       />
       <A.RowButtons
          refBtClose={getRefFocusLast(props)}
          caption="Edit"
          title="Edit List Name"
          onPrimary={_hRename}
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
