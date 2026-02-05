//import PropTypes from "prop-types";
import {
  useRef,
  getInputValue
} from '../uiApi';

import useValidationMessages from './hooks/useValidationMessages';
import useGroupOptions from './hooks/useGroupOptions';

import WatchPane from './WatchPane';
import SelectGroupList from './SelectGroupList';
import RowInputText from './RowInputText';

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
    <WatchPane
      validationMessages={validationMessages}
      refBtClose={getRefFocusLast(props)}
      caption="Edit"
      title="Edit List Name"
      onPrimary={_hRename}
      onClear={_hClear}
      onClose={onClose}
    >
       <SelectGroupList
          refEl={_refSelectGroupList}
          getWatchListsByGroup={getWatchListsByGroup}
          groupCaption="In Group"
          groupOptions={groupOptions}
          listCaption="List From"
       />
       <RowInputText
          refEl={_refInputText}
          caption="List To"
       />
    </WatchPane>
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
